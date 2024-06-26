import configparser
from flask_mail import Mail, Message

mail = None


def configure_email(app):
  app.config['MAIL_SERVER']='smtp.gmail.com'
  app.config['MAIL_PORT'] = 465
  app.config['MAIL_USERNAME'] = 'plrs.do.not.reply@gmail.com'
  app.config['MAIL_PASSWORD'] = read_smtp_pwd("src/email/email.ini")
  app.config['MAIL_USE_TLS'] = False
  app.config['MAIL_USE_SSL'] = True

  global mail
  mail = Mail(app)

def read_smtp_pwd(file_path):
    config = configparser.ConfigParser()
    config.read(file_path)
    pwd = config['PWD']['value']
    return pwd


def send_email(recipient, subject, body):
    try:
        msg = Message(subject=subject, sender='plrs.do.not.reply@gmail.com', recipients=[recipient])
        msg.body = body
        mail.send(msg)
        return True
    except Exception as error:
        print('Email error: ', error)
        return False