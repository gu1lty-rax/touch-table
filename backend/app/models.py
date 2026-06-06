from django.db import models
from django.core.validators import MinValueValidator


class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(0.01)])
    is_available = models.BooleanField(default=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    table_session = models.ForeignKey('TableSession', on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order Number {self.id} - Table {self.table_session.table_number}"


class OrderItem(models.Model):
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PREPARING', 'Preparing'),
        ('SERVED', 'Served'),
        ('CANCELLED', 'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.name} for Order {self.order.id} - Status: {self.status}"

    @property
    def subtotal(self):
        return self.menu_item.price * self.quantity

class TableSession(models.Model):
    table_number = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True, help_text="False when the session is closed and table is freed")
    opened_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Table {self.number}"
    
    @property
    def total_amount(self):
        return sum(item.subtotal for order in self.orders.all() for item in order.order_items.all())
