from django.urls import path
from app.views import login_view, dashboard, logout_view, reset_password, check_old_password


urlpatterns = [
    path('', dashboard, name="dashboard"),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name="logout"),
    path('reset_password/', reset_password, name="reset_password"),
    path('check_old_password/', check_old_password, name="check_old_password"),
]
