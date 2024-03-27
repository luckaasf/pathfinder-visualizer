from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import GridSerializer
from .models import CustomUser

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_grid(request):
    if request.method == 'POST':
        custom_user = get_object_or_404(CustomUser, user=request.user)
        request.data['user'] = custom_user.id
        serializer = GridSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=custom_user.id) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
