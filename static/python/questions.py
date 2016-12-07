# -*- coding: utf-8 -*-
from collections import OrderedDict
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Markup


class QuestionObject():
    question = ''
    alternateq = ''
    title = ''
    valuelist = []
    subinfo = ''
    link = ''
    style = "none"
    input = ''
    function = ''

q1 = {
    "q" : Markup("This is a new sample question?"),
    "aq": "This is a different alternate question?",
    "t" : 'q1',
    "v" : {"Answer X":'q01.0',
           "Answer Two":'q01.1'},
    "e" : "Definitions can be added here",
    "l" : "url info",
    "s" : "",
    "i" : "button",
    "f" : "update_site",
}

q2 = {
    "q" : Markup("This is a different question with Toasts -->"),
    "aq": "This is a different alternate question?",
    "t" : 'q2',
    "v" : {"Answer Three":'q02.0',
           "Answer Four":'q02.1'},
    "e" : "Definitions can be added here",
    "l" : "url info",
    "s" : "None",
    "i" : "button",
    "f" : "update_site",
}

q3    = {
    "q" : "What are your monthly housing costs?",
    "aq": "What are your monthly housing costs?",

    "t" : 'q3',
    "v" : {"next":'q03.0',
           },
    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "text",
    "f": "update_site",

}


q4 = {
    "q" : "What is your name?",
    "aq": "What is your name?",

    "t" : 'q4',
    "v" : {"Next":'q04.0',
		   },
    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "text",
    "f": "update_site",
}

q5 = {
    "q" : "What is your email address?",
    "aq": "What is your email address?",

    "t" : 'q5',
    "v" : {"Next":'q05.0',
		   },
    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "text",
    "f": "update_site",
}

q6 = {
    "q" : "Great, Last question.  Would you like to create an account to store this information?",
    "aq": "Great, Last question.  Would you like to create an account to store this information?",

    "t" : 'q6',
    "v" : {"Yes":'q06.0',
           "No":'q06.1',
		   },
    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "button",
    "f": "update_site",
}

q7 = {
    "q" : "Do you want to fill out a form?",
    "aq": "Great, Last question.  Would you like to create an account to store this information?",

    "t" : 'q7',
    "v" : {"Yes":'q07.0',
           "No":'q07.1',
           "Maybe": 'q07.2',
           },

    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "button",
    "f": "update_site",
}

q8 = {
    "q" : "Do blah blah blah?",
    "aq": "Great, Last question.  Would you like to create an account to store this information?",

    "t" : 'q8',
    "v" : {"Yes":'q08.0',
           "No":'q08.1',
           "Maybe": 'q08.2',
           },

    "e" : "Extra information in the hidden link",
    "l" : "", #url
    "s" : "None",
    "i": "button",
    "f": "update_site",
}




def make_query(q):
    d = q['v']
    Markup('<strong>The HTML String</strong>')
    query = QuestionObject()
    query.question = q['q']
    query.alternateq = q['aq']
    query.title = q['t']
    query.valuelist = OrderedDict(sorted(d.items(), key=lambda x: x[1], reverse=False))
    query.subinfo = q['e']
    query.link = q['l']
    query.style = q['s']
    query.input = q['i']
    query.function = q['f']

    return query


def returntesty():
    qlist = []
    theQuestions = [q1, q2, q3, q4, q5, q6, q7]
    for i in theQuestions:
        qlist.append(make_query(i))
    return qlist


