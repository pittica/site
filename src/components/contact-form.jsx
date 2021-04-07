import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import ReCaptcha, { Loader, Unloader } from '@pittica/gatsby-plugin-recaptcha';
import validator from 'validator';

import Section from '../components/ui/section';
import Input from '../components/ui/form/input';
import Textarea from '../components/ui/form/textarea';
import CheckBox from '../components/ui/form/checkbox';
import Button from '../components/ui/form/button';
import PrivacyLink from '../components/ui/link/privacy-link';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      loading: false,
      privacy: false,
      captcha: null,
      error: false,
      complete: false,
      name: '',
      email: '',
      message: '',
      validation: {
        email: false
      }
    };

    Loader();
  }

  componentWillUnmount() {
    Unloader();
  }

  loading() {
    if (this.props.onLoading) {
      this.props.onLoading(this.state);
    }
  }

  handleClick = () => {
    if (this.state.privacy && this.state.captcha && this.state.validation.email) {
      this.setState(() => {
        return {
          active: true,
          loading: true
        };
      });
      this.loading();

      const data = new FormData();
      data.set('name', this.state.name);
      data.set('email', this.state.email);
      data.set('message', this.state.message);
      data.set('g-recaptcha', this.state.captcha);

      axios
        .post('https://contact.pittica.com/', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(() => {
          this.setState({
            loading: false,
            error: false,
            complete: true,
            captcha: null
          });

          this.loading();
        })
        .catch(() => {
          this.setState({
            active: false,
            loading: false,
            error: true,
            complete: true,
            captcha: null
          });

          this.loading();
        });
    }
  };

  handleInputChange = (e) => {
    const target = e.target;

    if (target.type === 'email') {
      this.setState({
        validation: {
          email: validator.isEmail(target.value)
        }
      });
    }

    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handlePrivacy = (e) => {
    let checked = e.target.checked;

    this.setState(() => {
      return {
        privacy: checked
      };
    });
  };

  verifyCallback = (token) => {
    this.setState(() => {
      return {
        captcha: token
      };
    });
  };

  render() {
    return (
      <Section>
        {!this.state.complete && (
          <form method="post">
            <div className="columns">
              <div className="column">
                <Input name="name" label="Nome" onChange={this.handleInputChange} />
              </div>
              <div className="column">
                <Input
                  type="email"
                  name="email"
                  label="E-Mail"
                  onChange={this.handleInputChange}
                  className={classnames({ 'is-danger': !this.state.validation.email })}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <Textarea label="Messaggio" name="message" onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <CheckBox name="privacy" onChange={this.handlePrivacy}>
                  Dichiaro di aver letto l'<PrivacyLink>informativa sulla privacy</PrivacyLink> e autorizzo il
                  trattamento dei miei dati personali ai sensi del Dlgs. 196 del 30 giugno 2003 e dell'art. 13 GDPR
                  (Regolamento UE 2016/679) per finalità di contatto.
                </CheckBox>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <ReCaptcha
                  action="homepage"
                  sitekey="6Ldq-_UUAAAAACZQEpZvFdd2QkwzQxvdHsVpEKVA"
                  callback={this.verifyCallback}
                />
              </div>
              <div className="column">
                <Button label="Invia" onClick={this.handleClick} loading={this.state.loading} />
              </div>
            </div>
          </form>
        )}
        {this.state.complete && (
          <div
            className={classnames({
              notification: true,
              'is-info': !this.state.error,
              'is-danger': this.state.error
            })}
          >
            {!this.state.error ? (
              <div>
                <h3>Messaggio inviato!</h3>
                <p>Sarai ricontattato nel più breve tempo possibile.</p>
                <p>Grazie per averci contattato.</p>
              </div>
            ) : (
              <div>
                <h3>Messaggio non inviato!</h3>
                <p>C'è stato un problema tecnico nell'invio del tuo messaggio.</p>
                <p>Ci scusiamo per l'inconveniente.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    );
  }
}
