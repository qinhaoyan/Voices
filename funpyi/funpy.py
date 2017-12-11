from article.models import user,article,comment,subcomment,articlelike,IMG
import base64
from django.core.files.base import ContentFile
import pdb
import time

def login(stu_id,password):
    st = user.objects.filter(student_id = stu_id,
                             password = password)
    #pdb.set_trace()
    if(st):
        return 1
    else:
        return 0

def register(information):
    
    st = user.objects.create(student_id = information['stu_id'],
                             name = information['name'],
                             nickname = information['hname'],
                             password = information['password'])
    #pdb.set_trace()
    if(st):
        return 1
    else:
        return 0

def mine(stu_id):
    st = user.objects.filter(student_id = stu_id)
    stu = {
        'name'     : st[0].name,
        'nickname' : st[0].nickname,
        'userhead' : st[0].head.name,
        'stu_id'   : st[0].student_id
    }
    return stu

def publish_article(articles,noname,files,stu_id):
    try:
        #pdb.set_trace()
        publishtime = int(time.time()) 
        re = article.objects.create(article = articles,
                                    user = stu_id,
                                    liken = 0,
                                    commentn = 0,
                                    solved = '未解决',
                                    noname = noname,
                                    time = publishtime)
        i = 0
        for b in files:
            i += 1
            a, imgstr = b.split(';base64,')
            data = ContentFile(base64.b64decode(imgstr), name = str(re.id)+'_'+str(i)+'.' + 'jpg')
            IMG.objects.create(img = data,img_name = re.id)
        return 1
    except Exception as e:
        return 0

def formattime(nowtime,publishtime):
    ditime = nowtime - publishtime
    if ditime < 120:
        times = '刚刚'
    elif ditime < 43200:
        times = time.strftime("今天 %H:%M", time.localtime(publishtime)) 
    elif ditime < 86400:
        times = time.strftime("昨天 %H:%M", time.localtime(publishtime)) 
    elif ditime < 129600:
        times = time.strftime("前天 %H:%M", time.localtime(publishtime)) 
    elif ditime < 15768000:
        times = time.strftime("%m月%d日 %H:%M:%S", time.localtime(publishtime)) 
    else:
        times = time.strftime("%Y年%m月%d日 %H:%M:%S", time.localtime(publishtime)) 
    return times

def gethome(atype,stu_id):
    if atype is '1':
        datas = article.objects.filter()
    if atype is '2':
        datas = article.objects.filter(solved = '未解决')
    if atype is '3':
        datas = article.objects.filter(solved = '已解决')

    articles = []
     #pdb.set_trace()
    nowtime = int(time.time()) 
    # pdb.set_trace()
    for data in datas:
        coms = []
        username = user.objects.filter(student_id = data.user)
        comments = comment.objects.filter(article_id = data.id)
        for com in comments:
            subcomments = subcomment.objects.filter(comment_id = com.id)
            subcoms = []
            for subcom in subcomments:
                 subcoms.append({'subcomuser':subcom.user,
                                 'cont':subcom.content})
            coms.append({'comuser':com.user,
                          'cont':com.content,
                          'subcomment':subcoms})
        img = []
        imgs = IMG.objects.filter(img_name = data.id)
        for i in imgs:
            img.append(i.img.name)
        likeo = 0
        name = username[0].nickname
        head = username[0].head.name
        times = formattime(nowtime,int(data.time))
        if articlelike.objects.filter(user_id = stu_id,article_id = data.id):
            likeo = 1
         #pdb.set_trace()
        if data.noname == '1':
            name = '匿名'
            head = ''

        articles.append({'username':name,
                         'userhead':head,
                         'type':data.solved,
                         'article':data.article,
                         'liken':data.liken,
                         'likeo':likeo,
                         'comment':coms,
                         'img':img,
                         'time':times,
                         'url':data.id
                      })
    articles.reverse()
    return articles

def getmypublish(atype,stu_id):
    if atype is '1':
        datas = article.objects.filter(user = stu_id)
    if atype is '2':
        datas = article.objects.filter(user = stu_id,
                                      solved = '未解决')
    if atype is '3':
        datas = article.objects.filter(user = stu_id,
                                      solved = '已解决')
    articles = []
    nowtime = int(time.time()) 
    for data in datas:
        coms = []
        username = user.objects.filter(student_id = data.user)
        comments = comment.objects.filter(article_id = data.id)
        for com in comments:
            subcomments = subcomment.objects.filter(comment_id = com.id)
            subcoms = []
            for subcom in subcomments:
                subcoms.append({'subcomuser':subcom.user,
                                'cont':subcom.content})
            coms.append({'comuser':com.user,
                         'cont':com.content,
                         'subcomment':subcoms})
        img = []
        imgs = IMG.objects.filter(img_name = data.id)
        for i in imgs:
            img.append(i.img.name)
        likeo = 0
        name = username[0].nickname
        head = username[0].head.name
        times = formattime(nowtime,int(data.time))
        if len(img) == 1:
            img = []
        if articlelike.objects.filter(user_id = stu_id,article_id = data.id):
            likeo = 1
        #pdb.set_trace()
        if data.noname == '1':
            name = '匿名'
            head = ''

        articles.append({'username':name,
                        'userhead':head,
                        'type':data.solved,
                        'article':data.article,
                        'liken':data.liken,
                        'likeo':likeo,
                        'comment':coms,
                        'img':img,
                        'time':times,
                        'url':data.id
                     })
    articles.reverse()
    return articles

def getarticle(id,stu_id):
    a = article.objects.filter(id = id)
    data = a[0]
    #pdb.set_trace()
    #pdb.set_trace()
    username = user.objects.filter(student_id = data.user)
    comments = comment.objects.filter(article_id = data.id)
    coms = []
    
    #pdb.set_trace()
    nowtime = int(time.time())
    commentn  = 0;
    #pdb.set_trace()
    for com in comments:
        commentn +=1
        subcomments = subcomment.objects.filter(comment_id = com.id)
        comuser = user.objects.filter(student_id = com.user_id)
        subcoms = []
        for subcom in subcomments:
            commentn +=1
            subcoms.append({'subcomuser':subcom.user,
                            'subcomuser_id':subcom.user_id,
                            'subcomuser2':subcom.user2,
                            'cont':subcom.content})
        coms.append({'comuser':com.user,
                     'comid':com.id,
                     'comuser_id':comuser[0].student_id,
                     'comuser_head':comuser[0].head.name,
                     'time':formattime(nowtime,int(com.time)),
                     'cont':com.content,
                     'subcomment':subcoms})
    #img = data.img.split(',')
    likeo = 0
    name = username[0].nickname
    head = username[0].head.name
    times = formattime(nowtime,int(data.time))
    # if len(img) == 1:
    #         img = []
    #pdb.set_trace()
    if articlelike.objects.filter(user_id = stu_id,article_id = data.id):
        likeo = 1
    #pdb.set_trace()
    if data.noname == '1':
        name = '匿名'
        head = ''
    #pdb.set_trace()
    s = {'username':name,
         'userid' : username[0].student_id,
         'articleid':data.id,
         'userhead':head,
         'type':data.solved,
         'article':data.article,
         'liken':data.liken,
         'likeo':likeo,
         'comment':coms,
         'commentn':commentn,
        # 'img':img,
         'time':times,
         'url':data.id
        }
   # pdb.set_trace()
    return s

def  addcomment(com):
    stu = user.objects.filter(student_id = com['userid2'])
    if(com['commentid']):
        try:
            subcomment.objects.create(comment_id = com['commentid'],
                                      user2 = com['user'],
                                      user2_id = com['userid'],
                                      user = stu[0].nickname,
                                      user_id = com['userid2'],
                                      content = com['cont'],
                                      time = int(time.time()))
            return 1
        except Exception as e:
            return 0
    else:
        try:
            comment.objects.create(article_id = com['articleid'],
                                   user2 = com['user'],
                                   user2_id = com['userid'],
                                   user = stu[0].nickname,
                                   user_id = com['userid2'],
                                   content = com['cont'],
                                   time = int(time.time()))
            return 1
        except Exception as e:
            return 0

def like(article_id,types,stu_id):
    try:
        a = article.objects.get(id = article_id)
        user_id = a.user
        if types == '1':
            a.liken = int(a.liken) + 1
            a.save()
            articlelike.objects.create(user_id = stu_id,article_id = article_id,user2_id = user_id,time = int(time.time()))
        else:
            a.liken = int(a.liken) - 1
            a.save()
            articlelike.objects.filter(user_id = stu_id,article_id = article_id,user2_id = user_id).delete()
        return 1
    except Exception as e:
        return 0

def solved(article_id):
    try:
        a = article.objects.get(id = article_id)
        a.solved = '已解决'
        a.save()
        return 1
    except Exception as e:
        return 0
    
def getmessage(stu_id):
    try:
       
        com = comment.objects.filter(user2_id = stu_id)
        subcom = subcomment.objects.filter(user2_id = stu_id)
        alike = articlelike.objects.filter(user2_id = stu_id)
        data = []
        for con in com:
            ar = article.objects.filter(id = con.article_id)
            ur = user.objects.filter(student_id = con.user_id) 
            if ar[0].img:
                img = ''
            else:
                img = ar[0].img
            ars = ar[0].article
            data.append({'user_name':con.user,
                         'user_head':ur[0].head.name,
                         'type':'回复了你',
                         'time':int(con.time),
                         'word':con.content,
                         'img':img,
                         'article':ars,
                         'url':con.article_id})
        for bcon in subcom:
            cid = comment.objects.filter(id = bcon.comment_id)
            ar = article.objects.filter(id = cid[0].article_id)
            ur = user.objects.filter(student_id = bcon.user_id) 
            if ar[0].img:
                img = ''
            else:
                img = ar[0].img
            ars = ar[0].article
            data.append({'user_name':bcon.user,
                         'user_head':ur[0].head.name,
                         'type':'回复了你',
                         'time':int(bcon.time),
                         'word':bcon.content,
                         'img':img,
                         'article':ars,
                         'url':bcon.article_id})
        for ccon in alike:
            ar = article.objects.filter(id = ccon.article_id)
            ur = user.objects.filter(student_id = ccon.user_id) 
            if ar[0].img:
                img = ''
            else:
                img = ar[0].img
            ars = ar[0].article
            data.append({'user_name':ur[0].nickname,
                         'user_head':ur[0].head.name,
                         'type':'赞了你',
                         'time':int(ccon.time),
                         'word':'',
                         'img':img,
                         'article':ars,
                         'url':ccon.article_id})
       # pdb.set_trace()
        data.sort(key = lambda x:x['time'],reverse=True)
       # pdb.set_trace()
        for dtime in data:
            dtime['time'] = formattime(int(time.time()),dtime['time'])

        return data
    except Exception as e:
        return 0

