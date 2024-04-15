"""
URL configuration for pathfinder_visualizer_mixed project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from pathfinder import views_user, views_grid

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', views_user.register_user),
    path('api/login/', views_user.login_user),
    path('api/logout/', views_user.logout_user),
    path('api/grids/save/', views_grid.create_grid), # change path to api/grids/save/
    path('api/grids/<str:username>/', views_grid.get_user_grids),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
