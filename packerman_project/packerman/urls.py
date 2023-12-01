from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
   path('users/', views.UserList.as_view(), name='user_list'),
   path('users/<uuid:pk>', views.UserDetail.as_view(), name='user_detail'), 
   path('items/', views.ItemList.as_view(), name='item_list'),
   path('items/<uuid:pk>', views.ItemDetail.as_view(), name='item_detail'),
   path('events/', views.EventList.as_view(), name='event_list'),
   path('events/<int:pk>', views.EventDetail.as_view(), name='event_detail'),
   path ('user_items/', views.User_ItemList.as_view(), name='user_item_list'),
   path('user_items/<int:pk>', views.User_ItemDetail.as_view(), name='user_item_detail'),
   path ('event_items/', views.Event_ItemList.as_view(), name='event_item_list'),
   path('event_items/<int:pk>', views.Event_ItemDetail.as_view(), name='event_item_detail')
]