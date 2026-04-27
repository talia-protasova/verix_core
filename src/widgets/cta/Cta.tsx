import { useState, useEffect } from 'react';
import { isEmail } from '../../shared/lib/validation';
import './cta.scss';

export const Cta = () => {
    const [email, setEmail] = useState('');
    const [debouncedEmail, setDebouncedEmail] = useState(email);
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedEmail(email);
        }, 300);

        return () => clearTimeout(timer);
    }, [email]);

    const errorId = 'email-error';
    const valid = isEmail(debouncedEmail);

    const showError = touched && debouncedEmail.length > 0 && !valid;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTouched(true);

        if (!valid) {
            return;
        }

        setSubmitted(true);
    };

    return (
        <section className='cta-section' aria-labelledby='cta-title' id='cta'>
            <div className='cta-section__bg' />

            <div className='cta-section__container container'>
                <div className='cta-section__card'>
                    <h2 className='section-eyebrow'>Early Access</h2>

                    <h3 id='cta-title' className='section-title'>
                        Be first to build on
                        <br />
                        <span className='text-gradient section-title--accent'>
                            the fastest chain
                        </span>
                    </h3>

                    <p className='cta-section__description'>
                        Join the waitlist and get priority validator access, early SRDL allocation,
                        and direct access to our core team.
                    </p>

                    {!submitted ? (
                        <form className='cta-section__form' onSubmit={handleSubmit} noValidate>
                            <div className='form-field'>
                                <label htmlFor='email' className='sr-only'>
                                    Email address for waitlist
                                </label>

                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    className={`cta-section__input form-input ${
                                        showError ? 'form-input--error' : ''
                                    }`}
                                    placeholder='your@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setTouched(true)}
                                    aria-invalid={showError ? 'true' : 'false'}
                                    aria-describedby={showError ? errorId : undefined}
                                    autoComplete='email'
                                />

                                {showError && (
                                    <span id={errorId} className='form-error' role='alert'>
                                        Enter a valid email
                                    </span>
                                )}
                            </div>

                            <button
                                type='submit'
                                className='button button--brand cta-section__button'
                                disabled={!valid}
                            >
                                Join Waitlist
                            </button>
                        </form>
                    ) : (
                        <p className='cta-section__success' role='status' aria-live='polite'>
                            ✓ YOU'RE ON THE LIST
                        </p>
                    )}

                    <div className='cta-section__meta'>
                        <span>3,200+ on waitlist</span>
                        <span>No spam</span>
                        <span>Unsubscribe anytime</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
