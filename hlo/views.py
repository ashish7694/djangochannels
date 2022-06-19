from django.shortcuts import render
import json
import requests


def home(request,name):
    return render(request, 'home.html',{'name':name})

def apireq(request):
    response = requests.get("https://api.covid19api.com/countries").json()
    return render(request, 'covid.html',{'response':response})