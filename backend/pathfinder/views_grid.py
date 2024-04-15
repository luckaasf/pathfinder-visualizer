from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import GridSerializer
from .models import CustomUser, Grid

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_grid(request):
    if request.method == 'POST':
        custom_user = get_object_or_404(CustomUser, user=request.user)
        request.data._mutable=True
        request.data['user'] = custom_user.id
        serializer = GridSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=custom_user.id) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_grids(request, username):
    if request.method == 'GET':
        custom_user = get_object_or_404(CustomUser, username=username)
        request.data['user'] = custom_user.id
        grids = Grid.objects.filter(user_id=custom_user.id)
        serializerGrids = GridSerializer(grids, context={'request': request}, many=True)
        return Response(serializerGrids.data, status=status.HTTP_200_OK)