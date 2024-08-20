from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password')
            return render(request, 'login.html')

    return render(request, 'login.html')


@login_required(redirect_field_name="login", login_url='/login/')
def dashboard(request):
    return render(request, 'welcome.html')


@login_required(redirect_field_name="login", login_url='/login/')
def reset_password(request):
    if request.method == 'POST':
        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password')
        re_new_password = request.POST.get('re_new_password')

        if new_password == old_password:
            messages.error(request, 'New password cannot be same as old password')
            return render(request, 'reset_password.html')

        if new_password == re_new_password:
            user = authenticate(request, username=request.user.username, password=old_password)
            if user is not None:
                user.set_password(new_password)
                user.save()
                messages.success(request, 'Password reset successfully. Please Login Again!')
                return redirect('dashboard')
            else:
                messages.error(request, 'Invalid old password')
                return render(request, 'reset_password.html')
        else:
            messages.error(request, 'Password do not match')
            return render(request, 'reset_password.html')
    return render(request, 'reset_password.html')


@login_required(redirect_field_name="login", login_url='/login/')
def check_old_password(request):
    if request.method == 'POST':
        old_password = request.POST.get('old_password')
        user = authenticate(request, username=request.user.username, password=old_password)
        if user is not None:
            return JsonResponse({'is_valid': True})
        else:
            return JsonResponse({'is_valid': False})
    return JsonResponse({'message': 'Method Not Allowed'}, status=405)


def logout_view(request):
    logout(request)
    return redirect('login')
