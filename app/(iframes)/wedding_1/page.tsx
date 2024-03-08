'use client';

import React from 'react';

import { loadScript } from 'utils/Script/loadScript';

const IMAGES = [
    '/wedding/img/0.jpg',
    '/wedding/img/1.jpg',
    '/wedding/img/2.jpg',
    '/wedding/img/3.jpg',
    '/wedding/img/4.jpg',
    '/wedding/img/5.jpg',
    '/wedding/img/6.jpg',
    '/wedding/img/7.jpg',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;

let slideIndex = 1;

export default function Page ( ): JSX.Element {
    React.useEffect(() => {
        loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js')
            .then(() => {
                $('.prev').click(() => {
                    plusSlides(-1);
                });
                $('.next').click(() => {
                    plusSlides(1);
                });
            })
            .catch((error) => {
                // eslint-disable-next-line no-console -- ignore
                console.error(error);
            });

        let timeoutId: NodeJS.Timeout | undefined;
        showSlides(slideIndex);

        function plusSlides (n: number): void {
            showSlides(slideIndex += n);
        }

        function showSlides (n: number): void {
            console.log('showSlides', n);
            let i;
            const slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('mySlide') as HTMLCollectionOf<HTMLElement>;
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            for (i = 0; i < slides.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slides[i]!.style.display = 'none';
            }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slides[slideIndex - 1]!.style.display = 'block';
      clearTimeout(timeoutId);

      timeoutId = setTimeout(function () {
          plusSlides(1);
      }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="container">
            <link href={'/wedding/style.css'} rel={'stylesheet'} />
            <div className="photoContainer">
                <div className="photoContainer__child">
                    <div className="photoContainer__grandChild">
                        <div className="slideshowContainer">
                            {
                                IMAGES.map((url, i) => <div key={i} className="mySlide" style={{
                                    backgroundImage: `url(${url})`,
                                }}></div>)
                            }
                            <a className="prev">&#10094;</a>
                            <a className="next">&#10095;</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="textContent">
                <div role="button" aria-label="Scroll down button" className="scrollDownButton__container" onClick={() => {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $('.textContent').offset().top,
                    }, 500);
                }}>
                    <div className="scrollDownButton" data-name="icon-arrow_small_bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path
                                d="M22.283 11.138L16 17.421l-6.283-6.283a1.619 1.619 0 00-2.283 0 1.619 1.619 0 000 2.283l7.417 7.433a1.618 1.618 0 002.3 0l7.417-7.433a1.619 1.619 0 000-2.283 1.619 1.619 0 00-2.283 0z">
                            </path>
                        </svg>
                    </div>
                </div>
                <div className="RSVP4styled__WmCustomContainer-sc-1c14u6b-1 kpkbJn WMContainer-sc-ewl9y2-0 mJydL">
                    <div className="RSVP4styled__Content-sc-1c14u6b-9 imrMpe">
                        <div className="RSVP4styled__AdditionalContent-sc-1c14u6b-10 fhRlOz">
                            <div className="RSVP4styled__ImageFigure-sc-1c14u6b-30 bizIxX">
                                <div className="LazyLoad is-visible">
                                    <figure className="lazy-figure styled__Figure-sc-13kgj0f-0 kUeEHn">
                                        <img alt="Additional img"
                                            sizes="[object Object]"
                                            src="https://hosting.renderforestsites.com/5699226/1031500/media/8d3aaffc00bcac0d92091e45e5f70eb4.png"
                                            className="  img-loaded RSVP4styled__Img-sc-1c14u6b-31 ldokOu RSVP4styled__Img-sc-1c14u6b-31 ldokOu"
                                            style={{
                                                width: '128px',
                                                left: '11px',
                                                top: '32px',
                                                transform: 'rotate(0deg)',
                                                height: 'auto',
                                                position: 'absolute',
                                            }}/>
                                    </figure>
                                </div>
                                <div className="image-state-overlay ImgStateOverlaystyled__StateOverlay-sc-1kuc7p9-4 ghgvWw">
                                    <div className="ImgStateOverlaystyled__Content-sc-1kuc7p9-0 ilVaPK"></div>
                                </div>
                            </div>
                            <h1
                                className="RSVP4styled__Title-sc-1c14u6b-6 WM_GLOBAL_heading32 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 fnNtoH">
                            We are engaged</h1>
                            <p
                                className="RSVP4styled__Paragraph-sc-1c14u6b-7 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 eTUclA">
                                <b>Dear family and friends,
                                </b>
                                {`Our hearts have officially found their forever home, and we couldn't be more over the moon! We simply
                            can't wait to celebrate our engagement with all of you. So, mark your calendars for <b>October 6th </b>and
                            get ready for an unforgettable night of love, laughter, and making memories that will warm our hearts for
                            years to come.&nbsp;&nbsp;`}
                            </p>
                        </div>
                        <div className="RSVP4styled__StepsContent-sc-1c14u6b-11 kFJVMc">
                            <div className="RSVP4styled__StepsWrap-sc-1c14u6b-19 QVEko">
                                <div className="RSVP4styled__StepItemWrap-sc-1c14u6b-20 GcPKn">
                                    <div className="RSVP4styled__StepInfoWrapper-sc-1c14u6b-23 gRSSPJ">
                                        <p
                                            className="RSVP4styled__StepInfo-sc-1c14u6b-24 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 caZvJv">
                                    6:00 PM</p>
                                    </div>
                                    <div className="step-right-content RSVP4styled__StepContent-sc-1c14u6b-21 dVWtcm">
                                        <div className="RSVP4styled__Circle-sc-1c14u6b-26 hwortN"></div>
                                        <p
                                            className="RSVP4styled__StepTitle-sc-1c14u6b-25 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 lcbWkG">
                                    Arrival &amp; mingling</p>
                                        <p
                                            className="RSVP4styled__StepsParagraph-sc-1c14u6b-18 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 gKEwVo">
                                    Join us at the venue and get ready to mingle! Catch up with old friends, meet new ones, and share in
                                    the joyous atmosphere of our engagement party.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="RSVP4styled__StepsWrap-sc-1c14u6b-19 QVEko">
                                <div className="RSVP4styled__StepItemWrap-sc-1c14u6b-20 GcPKn">
                                    <div className="RSVP4styled__StepInfoWrapper-sc-1c14u6b-23 gRSSPJ">
                                        <p
                                            className="RSVP4styled__StepInfo-sc-1c14u6b-24 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 caZvJv">
                                    7:30 PM</p>
                                    </div>
                                    <div className="step-right-content RSVP4styled__StepContent-sc-1c14u6b-21 dVWtcm">
                                        <div className="RSVP4styled__Circle-sc-1c14u6b-26 hwortN"></div>
                                        <p
                                            className="RSVP4styled__StepTitle-sc-1c14u6b-25 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 lcbWkG">
                                    Toasts &amp; feasting</p>
                                        <p
                                            className="RSVP4styled__StepsParagraph-sc-1c14u6b-18 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 gKEwVo">
                                    Get ready for a toast-filled celebration! Gather around as we raise our glasses to love. Afterward,
                                    indulge in a tasty feast, savoring a variety of mouthwatering dishes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="RSVP4styled__StepsWrap-sc-1c14u6b-19 QVEko">
                                <div className="RSVP4styled__StepItemWrap-sc-1c14u6b-20 GcPKn">
                                    <div className="RSVP4styled__StepInfoWrapper-sc-1c14u6b-23 gRSSPJ">
                                        <p
                                            className="RSVP4styled__StepInfo-sc-1c14u6b-24 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 caZvJv">
                                    9:00 PM</p>
                                    </div>
                                    <div className="step-right-content RSVP4styled__StepContent-sc-1c14u6b-21 dVWtcm">
                                        <div className="RSVP4styled__Circle-sc-1c14u6b-26 hwortN"></div>
                                        <p
                                            className="RSVP4styled__StepTitle-sc-1c14u6b-25 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 lcbWkG">
                                    Dance &amp; laughter</p>
                                        <p
                                            className="RSVP4styled__StepsParagraph-sc-1c14u6b-18 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 gKEwVo">
                                            {`Here's the time to let loose and hit the dance floor! The DJ will spin an eclectic mix of tunes,
                                    guaranteed to keep you grooving all night long.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="RSVP4styled__DataContent-sc-1c14u6b-12 qRzST">
                            <div className="RSVP4styled__DataTimeContainer-sc-1c14u6b-13 esReFB">
                                <div className="RSVP4styled__DataTimeContainerItem-sc-1c14u6b-14 gMhRJV">
                                    <p
                                        className="RSVP4styled__DateTitle-sc-1c14u6b-15 WM_GLOBAL_heading20 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 zssBY">
                                Date &amp; Time</p>
                                    <p
                                        className="RSVP4styled__DateValue-sc-1c14u6b-16 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 jSAFaE">
                                31.01.2025 | 6:00PM (GMT-10:00)</p>
                                </div>
                                <div className="RSVP4styled__DataTimeContainerItem-sc-1c14u6b-14 gMhRJV">
                                    <p
                                        className="RSVP4styled__DateTitle-sc-1c14u6b-15 WM_GLOBAL_heading20 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 zssBY">
                                Location</p><a target="_blank"
                                        href="https://maps.google.com/maps?q=Fort+Lauderdale+St,Florida+32091,USA"
                                        className="RSVP4styled__LocationValue-sc-1c14u6b-17 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 IiUkA" rel="noreferrer">Evergreen
                                Feast, Florida, United States</a>
                                </div>
                            </div>
                            <p
                                className="RSVP4styled__CardSubTitle-sc-1c14u6b-5 WM_GLOBAL_paragraph14 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 kzSOma">
                            The big day is swiftly approaching</p>
                            <h1
                                className="RSVP4styled__Title-sc-1c14u6b-6 WM_GLOBAL_heading42 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 fnNtoH">
                                {'Can\'t wait to see you'}
                            </h1>
                            <p
                                className="RSVP4styled__CardParagraph-sc-1c14u6b-8 WM_GLOBAL_paragraph18 sm-word-wrap EditableContent__styledAsRef-sc-15za8y8-0 eTUclA">
                            Your response is greatly appreciated. Kindly reply by August 30th.</p>
                            <div className="RSVPButtonstyled__ButtonWrap-sc-f74s5z-0 jbWoBv"><button
                                className="WM_GLOBAL_paragraph RSVPButtonstyled__Button-sc-f74s5z-1 ebCddk">RSVP</button></div>
                        </div>
                    </div>
                </div>
                <div className="form-container styled__Container-sc-nqpo2f-7 kpvOas">
                    <div className="styled__FormContainer-sc-nqpo2f-1 ccWEov" id="6475_formId">
                        <div className="form-wrapper styled__FormWrapper-sc-nqpo2f-2 cHhkY">
                            <div className="styled__RSVPOptionWrapper-sc-nqpo2f-0 krqWjs">
                                <div className="radio-button-list RSVPRadioButtonListstyled__SectionWrap-sc-1ygymcr-2 bssfcA">
                                    <div className="radio-buttons-title RSVPRadioButtonListstyled__RadioButtonTitleWrap-sc-1ygymcr-4 kGUMfC">
                                        <h4 className="WM_GLOBAL_heading20 RSVPRadioButtonListstyled__RadioButtonsTitle-sc-1ygymcr-1 jvEiUV">Will
                                    you join and make memories with us?<span
                                            className="RSVPRadioButtonListstyled__Asterisk-sc-1ygymcr-3 bNxhAP"></span></h4>
                                    </div>
                                    <form className="RSVPRadioButtonListstyled__OptionsWrap-sc-1ygymcr-0 gAgQGq">
                                        <div className="RSVPRadioButtonstyled__RadioButtonWrap-sc-1396f4y-1 dWXCVc">
                                            <input type="radio" id="yes"
                                                name="options" className="RSVPRadioButtonstyled__Input-sc-1396f4y-2 jKwCPF" value="yes"
                                            />
                                            <label htmlFor="yes"
                                                className="WM_GLOBAL_paragraph18 RSVPRadioButtonstyled__Label-sc-1396f4y-0 eISTvP">
                                                {'Yes, I wouldn\'t miss it!'}
                                            </label></div>
                                        <div className="RSVPRadioButtonstyled__RadioButtonWrap-sc-1396f4y-1 dWXCVc">
                                            <input type="radio" id="no"
                                                name="options" className="RSVPRadioButtonstyled__Input-sc-1396f4y-2 jKwCPF" value="no"/>
                                            <label htmlFor="no"
                                                className="WM_GLOBAL_paragraph18 RSVPRadioButtonstyled__Label-sc-1396f4y-0 eISTvP">
                                        Sorry, I can’t make it.
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="styled__InputPair-sc-nqpo2f-4 fUoaYa">
                                <div className="   RSVPInputstyled__InputContainer-sc-6srjsa-1 bJwPxJ">
                                    <div className="RSVPInputstyled__LabelWrapper-sc-6srjsa-5 kARbgn">
                                        <label
                                            className="WM_GLOBAL_paragraph14 RSVPInputstyled__Label-sc-6srjsa-3 fCsLUu" htmlFor="name">First name <span
                                                className="asterisk RSVPInputstyled__Asterisk-sc-6srjsa-2 ihWBnF">*</span></label></div>
                                    <input
                                        type="text" className="WM_GLOBAL_secondary-font RSVPInputstyled__Input-sc-6srjsa-0 bELzdd" value=""/>
                                </div>
                                <div className="   RSVPInputstyled__InputContainer-sc-6srjsa-1 bJwPxJ">
                                    <div className="RSVPInputstyled__LabelWrapper-sc-6srjsa-5 kARbgn">
                                        <label
                                            className="WM_GLOBAL_paragraph14 RSVPInputstyled__Label-sc-6srjsa-3 fCsLUu" htmlFor="name">Last name <span
                                                className="asterisk RSVPInputstyled__Asterisk-sc-6srjsa-2 ihWBnF">*</span></label></div>
                                    <input
                                        type="text" className="WM_GLOBAL_secondary-font RSVPInputstyled__Input-sc-6srjsa-0 bELzdd" value=""/>
                                </div>
                            </div>
                            <div className="styled__InputPair-sc-nqpo2f-4 fUoaYa">
                                <div className="   RSVPInputstyled__InputContainer-sc-6srjsa-1 bJwPxJ">
                                    <div className="RSVPInputstyled__LabelWrapper-sc-6srjsa-5 kARbgn">
                                        <label
                                            className="WM_GLOBAL_paragraph14 RSVPInputstyled__Label-sc-6srjsa-3 fCsLUu" htmlFor="name">Email <span
                                                className="asterisk RSVPInputstyled__Asterisk-sc-6srjsa-2 ihWBnF">*</span></label></div>
                                    <input
                                        type="text" className="WM_GLOBAL_secondary-font RSVPInputstyled__Input-sc-6srjsa-0 bELzdd" value=""/>
                                </div>
                                <div className="   RSVPInputstyled__InputContainer-sc-6srjsa-1 bJwPxJ">
                                    <div className="RSVPInputstyled__LabelWrapper-sc-6srjsa-5 kARbgn">
                                        <label
                                            className="WM_GLOBAL_paragraph14 RSVPInputstyled__Label-sc-6srjsa-3 fCsLUu" htmlFor="name">Phone number
                                            <span className="asterisk RSVPInputstyled__Asterisk-sc-6srjsa-2 ihWBnF">*</span></label></div>
                                    <input
                                        type="text" className="WM_GLOBAL_secondary-font RSVPInputstyled__Input-sc-6srjsa-0 bELzdd" value=""/>
                                </div>
                            </div><button className="WM_GLOBAL_paragraph14 styled__AdditionalGuestButton-sc-nqpo2f-5 gTqPGZ">+ Additional
                            guest</button>
                            <div className="dynamic-fields styled__DynamicFields-sc-nqpo2f-6 kejHfS">
                                <div className="rsvp-input   RSVPInputstyled__InputContainer-sc-6srjsa-1 bJwPxJ">
                                    <div className="RSVPInputstyled__LabelWrapper-sc-6srjsa-5 kARbgn">
                                        <label
                                            className="WM_GLOBAL_paragraph14 RSVPInputstyled__Label-sc-6srjsa-3 fCsLUu" htmlFor="name">Any other details
                                    to share as we make preparations? <span
                                                className="asterisk RSVPInputstyled__Asterisk-sc-6srjsa-2 ihWBnF">*</span></label></div>
                                    <input
                                        type="text" className="WM_GLOBAL_secondary-font RSVPInputstyled__Input-sc-6srjsa-0 bELzdd" value=""/>
                                </div>
                            </div>
                            <button className="WM_GLOBAL_paragraph14 styled__SubmitButton-sc-nqpo2f-3 dvenFH">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
