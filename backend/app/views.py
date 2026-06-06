from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MenuItem, Order, OrderItem, TableSession
from .serializers import MenuItemSerializer, OrderSerializer, OrderItemSerializer, TableSessionSerializer
from django.http import HttpResponse

@api_view(['GET'])
def get_menu(request):
    items = MenuItem.objects.filter(is_available=True)
    serializer = MenuItemSerializer(items, many=True)

    return Response(serializer.data)
