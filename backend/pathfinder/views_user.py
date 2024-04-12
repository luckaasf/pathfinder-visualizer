from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import CustomUser
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            custom_user = CustomUser.objects.filter(user=user).first()
            if custom_user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'email': custom_user.email,
                    'username': custom_user.username,
                    'id': custom_user.id
                })
            else:
                return Response({'error':'Custom User not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def logout_user(request):
    if request.method == 'POST':
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(' ')[1]
            token = Token.objects.filter(key=auth_token).first()
            if token:
                token.delete()
                return Response({'success': 'User logged out successfully'})
            else:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Authorization header is missing'}, status=status.HTTP_400_BAD_REQUEST)
