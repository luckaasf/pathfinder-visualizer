from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    if (request.method == 'POST'):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        #print(request.data)
        if (User.objects.filter(username=username).exists()):
            return Response({'error':'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if (User.objects.filter(email=email).exists()):
            return Response({'error':'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if (password != confirm_password):
            return Response({'error':'Passwords are not matching'}, status=status.HTTP_400_BAD_REQUEST)
        if (len(username) < 4):
            return Response({'error':'Username should have at least 4 characters'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data, context={'request':request})

        if (serializer.is_valid()):
            serializer.save()
            user = get_object_or_404(User, username=username)
            CustomUser.objects.create(user=user, username=username, email=email)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        