from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Product
from .serializers import ProductSerializer
from .filters import ProductsFilter

@api_view(['GET'])
def get_products(request):
    filterset = ProductsFilter(request.GET, queryset=Product.objects.all().order_by('id'))

    
    resPerPage = 5  
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    queryset = paginator.paginate_queryset(filterset.qs, request)

    
    serializer = ProductSerializer(queryset, many=True)

    return paginator.get_paginated_response({"products": serializer.data})


@api_view(['GET'])
def get_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response({"product": serializer.data})
