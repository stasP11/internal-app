import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    position: 'relative',

    '& .gigya-screen .gigya-composite-control.gigya-composite-control-label,  & .gigya-screen .gigya-composite-control.gigya-composite-control-link':
        {
            margin: 0,
            float: 'left',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontWeight: 400,
            '&[data-switch-screen="bayer-forgot-password-screen"]': {
                float: 'right',
            },
        },

    '& .gigya-screen.portrait .gigya-composite-control.gigya-composite-control-social-login': {
        //  button-internal hidden temporarily
        display: 'none !important',
        position: 'absolute',
        bottom: -100,
        right: 0,
        left: 0,
        margin: 0,
        padding: theme.spacing(0, 6),
        width: 'auto !important',
    },

    '& .gigya-screen.portrait .gigya-composite-control.gigya-composite-control-social-login .gigya-login-providers-container, & .gigya-screen .gigya-social-login-container':
        {
            margin: 0,
            width: 'auto !important',
        },
    '& & .gigya-screen select, & .gigya-screen input[type=text], & .gigya-screen input[type=password],& .gigya-screen input[type=email],& .gigya-screen a.gigya-button,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gigya-button.gig-tfa-phone-code-resend,& .gigya-screen textarea':
        {
            width: '100%',
            height: 50,
            borderRadius: 0,
            border: '1px solid #D4D8DC',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            boxShadow: 'none',
            color: '#162E48',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
        },

    '& select[name="data.bc_salutation"], & a[data-screenset-element-id="__gig_template_element_37_1651245546506"], & input[name="data.bc_title"], & input[name="profile.firstName"], & input[name="profile.lastName"], & input[name="profile.phones.number"]':
        {
            display: 'none !important',
        },
    '& .gigya-screen': {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        width: '100% !important',
    },

    '& #container_social_0_uiContainer': {
        width: '100% !important',
    },
    '& h1.gigya-screen-caption': {
        borderBottom: 'none',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 48,
        lineHeight: '52px',
        paddingLeft: 0,
        width: '100% !important',
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
    },
    '& .gigya-screen *.gigya-error-msg, & .gigya-screen *.gigya-error-msg-active.gigya-form-error-msg': {
        textAlign: 'left',
        fontWeight: '400 !important',
    },

    '& .gigya-screen input.gigya-input-text.gigya-error, & .gigya-screen.portrait div.gigya-tfa .gig-tfa-container input.gigya-error.gig-tfa-code-textbox,& .gigya-screen input.gigya-input-password.gigya-error':
        {
            borderRadius: 0,
        },

    '& .gigya-screen a.gigya-button,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gigya-button.gig-tfa-phone-code-resend,& .gigya-screen input[type=button],& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button-submit,& .gigya-screen input[type=submit],& .gigya-screen button[type=submit],& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-phone-edit-link':
        {
            position: 'relative',
            boxSizing: 'border-box',
            WebkitTapHighlightColor: 'transparent',
            outline: 0,
            margin: 0,
            padding: theme.spacing(0, 3),
            cursor: 'pointer',
            userSelect: 'none',
            verticalAlign: 'middle',
            appearance: 'none',
            textDecoration: 'none',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            minWidth: 64,
            textTransform: 'uppercase',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 12,
            lineHeight: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%',
            height: '50px',
            border: 'none',
            borderRadius: 0,
            transition: 'all 0.3s ease 0s',
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(57, 97, 129)',
        },
    '& .gigya-screen a.gigya-button:before,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gigya-button.gig-tfa-phone-code-resend:before,& .gigya-screen input[type=button]:before,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button:before,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button-submit:before,& .gigya-screen input[type=submit]:before,& .gigya-screen button[type=submit]:before,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-phone-edit-link:before':
        {
            content: '""',
            display: 'block',
            width: '110%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 'calc(100% - 64px)',
            transform: 'skewX(-12deg)',
            opacity: 1,
            transition: 'left 0.3s ease 0s',
            backgroundColor: 'rgb(54, 73, 90)',
        },
    '& .gigya-screen a.gigya-button:after,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gigya-button.gig-tfa-phone-code-resend:after,& .gigya-screen input[type=button]:after,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button:after,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-button-container .gig-tfa-button-submit:after,& .gigya-screen input[type=submit]:after,& .gigya-screen button[type=submit]:after,& .gigya-screen.portrait div.gigya-tfa .gig-tfa-container .gig-tfa-phone-edit-link:after':
        {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '50%',
            right: 18,
            transform: 'translate(0px, -50%)',
            width: 24,
            height: 24,
            transition: 'right 0.3s ease 0s',
            background: 'url(https://d3r0jorof01i94.cloudfront.net/arrow-right-white.svg) center center no-repeat transparent',
        },
    '& .gigya-screen h2.gigya-composite-control.gigya-composite-control-header.mandatory': {
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
    },
    '& .gigya-screen .gigya-checkbox-text': {
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
    },
    // checkbox 'remember me' hidden temporarily
    '& .gigya-login-form .gigya-composite-control.gigya-composite-control-checkbox': {
        display: 'none !important',
        padding: 0,
        width: 0,
        height: 0,
        visibility: 'hidden !important',
        margin: 0,
    },
}));
