from django.contrib import admin
from .models import MenuItem, Order, OrderItem, TableSession


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('name',)
    list_editable = ('price', 'is_available')


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('menu_item', 'quantity', 'status')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'table_session', 'created_at')
    list_filter = ('created_at', 'table_session__table_number')
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'menu_item', 'quantity', 'status')
    list_filter = ('status', 'menu_item__name')
    list_editable = ('status',)
    search_fields = ('menu_item__name',)

    @admin.display(ordering='order__table_session__table_number', description='Subtotal')
    def get_table_number(self, obj):
        return obj.order.table_session.table_number


class OrderInline(admin.TabularInline):
    model = Order
    extra = 0
    show_change_link = True


@admin.register(TableSession)
class TableSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'table_number', 'is_active', 'opened_at', 'closed_at')
    list_filter = ('is_active', 'opened_at')
    inlines = [OrderInline]
    search_fields = ('table_number',)