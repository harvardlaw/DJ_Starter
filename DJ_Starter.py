from flask import Flask, render_template, jsonify, request
from static.python import questions, analyze
from collections import OrderedDict
import ast
import os
from static import files

app = Flask(__name__)

@app.route('/')
def main_page():
    list = questions.returntesty()
    d = list[1].valuelist
    league = OrderedDict(sorted(d.items(), key=lambda x: x[1], reverse=False))
    return render_template('index.html', xlist = list, answers = league)


@app.route('/finished', methods=['POST'])
def finished():
    x = request.json
    return render_template('finished.html', world=x['q3'])

import docxtpl

def endYN(dict):
    if 'q7' in dict:
        # execute code to generate a new document after the 7th question
        pathfrom = app.root_path + '/static/files/demo.docx'
        pathto = app.root_path + '/static/files/demoX.docx'
        templateDocument = docxtpl.DocxTemplate(pathfrom)
        templateDocument.render(dict)
        templateDocument.save(pathto)

    return "NO"


@app.route('/postmethod', methods = ['GET', 'POST'])
def get_post_javascript_data():
    dict = ast.literal_eval(request.form['all_data'])
    c = analyze.direction(dict['current'], dict)
    yn = endYN(dict)
    # d = analyze.updateQs(dict['current'], dict)
    remove = analyze.removeQ(dict['current'], dict)


    return jsonify({'from' : c[0],
                    'to'   : c[1],
                    'end'  : yn,
                    'remove':remove
                    })


if __name__ == '__main__':
    app.run()

