
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
import json
from funpyi import funpy
import pdb
from django.core.files.base import ContentFile

# Create your views here.
def alogin(request):
    return render(request,'login.html')
def login(request):
    re = funpy.login(request.POST['stu_id'],request.POST['password'])
    if(re):
        request.session['stu_id'] = request.POST['stu_id']
    return HttpResponse(json.dumps({'result':re}),content_type="application/json")

def loginout(request):
    try:
        del request.session['stu_id']
        return HttpResponse(json.dumps({'re':1}),content_type='application/json') 
    except Exception as e:
        return HttpResponse(json.dumps({'re':0}),content_type='application/json')   

def register(request):
    infomation ={
        'stu_id':request.POST['stu_id'],
        'name':request.POST['name'],
        'hname':request.POST['hname'],
        'password':request.POST['password']
    }
    re = funpy.register(infomation)
    if(re):
        request.session['stu_id'] = request.POST['stu_id']

    return HttpResponse(json.dumps({'result':re}),content_type="application/json")

def home(request):
    return render(request,'home.html')
    # stu_id = request.session.get('stu_id')
    # if(stu_id):
        
    # else:
    #   return render(request,'login.html')

def gethome(request):
    stu_id = request.session.get('stu_id')
    if stu_id:
        data = funpy.gethome(request.GET['type'],stu_id)
    else:
        data = funpy.gethome(request.GET['type'],'0')
    return HttpResponse(json.dumps({'result':data}),content_type="application/json")
    
def message(request):
    stu_id = request.session.get('stu_id')
    #pdb.set_trace()
    if(stu_id):
        stu = funpy.mine(stu_id)
       # pdb.set_trace()
        return render(request,'message.html',stu)
    else:
        return render(request,'login.html')



def publish(request):
    stu_id = request.session.get('stu_id')
    if(stu_id):
        return render(request,'publish.html')
    else:
        return render(request,'login.html')
    
def mine(request):
    stu_id = request.session.get('stu_id')
    #pdb.set_trace()
    if(stu_id):
        stu = funpy.mine(stu_id)
       # pdb.set_trace()
        return render(request,'mine.html',stu)
    else:
        return render(request,'login.html')

def my_publish(request):
    return render(request,'mypublish.html')

def getmy_publish(request):
   #pdb.set_trace()
    atype = request.GET['type']
    stu_id = request.session.get('stu_id')
    data = funpy.getmypublish(atype,stu_id) 
    return HttpResponse(json.dumps(data,ensure_ascii=False),content_type="application/json")


def article(request,id):
    stu_id = request.session.get('stu_id')
    if stu_id:
        data = funpy.getarticle(id,stu_id)
    else:
        data = funpy.getarticle(id,'0')
    return render(request,'article.html',data)

def publish_article(request):
    stu_id = request.session.get('stu_id')
    file = request.POST.getlist('img')
    article = request.POST['article']
    noname = request.POST['noname']
    re = funpy.publish_article(article,noname,file,stu_id)
    return HttpResponse(json.dumps({'re':re}),content_type="application/json")

def comment(request):
    stu_id = request.session.get('stu_id')
    if(stu_id):
        cont = request.POST['cont']
        articleid = request.POST['articleid']
        commentid = request.POST['commentid']
        user = request.POST['user']
        userid = request.POST['userid']
        #pdb.set_trace()
        com = {
            'cont':cont,
            'articleid':articleid,
            'commentid':commentid,
            'user':user,
            'userid':userid,
            'userid2':stu_id
        }
        re = funpy.addcomment(com)
        
        return HttpResponse(json.dumps({'re':re}),content_type="application/json")


    else:
        return render(request,'login.html')

def like(request):
    stu_id = request.session.get('stu_id')
    if stu_id:
        re = funpy.like(request.POST['id'],request.POST['type'],stu_id)
        return HttpResponse(json.dumps({'re':re}),content_type="application/json")
    else:
        return HttpResponse(json.dumps({'re':2}),content_type="application/json")

def isyou(request):
    stu_id = request.session.get('stu_id')
    if stu_id == request.POST['id']:
        return HttpResponse(json.dumps({'re':1}),content_type="application/json")
    else:
        return HttpResponse(json.dumps({'re':0}),content_type="application/json")

def soveld(request):
    re = funpy.solved(request.POST['articleid'])
    return HttpResponse(json.dumps({'re':re}),content_type="application/json")

def getmessage(request):
    stu_id = request.session.get('stu_id')
    data = funpy.getmessage(stu_id)
    return HttpResponse(json.dumps(data,ensure_ascii=False),content_type="application/json")
