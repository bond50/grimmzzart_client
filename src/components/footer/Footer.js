import classes from './Footer.module.css'
import {Icon} from '@iconify/react';
import {Link} from 'react-router-dom'

const FooterLinks = ({title, links}) => {
    return (
        <div className={`col-lg-2 col-md-3 ${classes.FooterLinks}`}>
            <h4>{title}</h4>
            <ul>
                {links.map((link, i) =>
                    <li key={i}>
                        <Link to={link.url}>{link.label}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

const Footer = () => {
    const usefulLinks = [
        {label: 'Home', url: '#'},
        {label: 'About us', url: '#'},
        {label: 'Services', url: '#'},
        {label: 'Terms of service', url: '#'},
        {label: 'Privacy policy', url: '#'},
    ];

    const ourServicesLinks = [
        {label: 'Web Design', url: '#'},
        {label: 'Web Development', url: '#'},
        {label: 'Product Management', url: '#'},
        {label: 'Marketing', url: '#'},
        {label: 'Graphic Design', url: '#'},
    ];
    const socialLinks = [
        {name: 'Twitter', icon: 'twitter', to: '/'},
        {name: 'Facebook', icon: 'facebook', to: '/'},
        {name: 'Instagram', icon: 'instagram', to: '/'},
        {name: 'LinkedIn', icon: 'linkedin', to: '/'},
    ];

    return (
        <footer className={classes.Footer}>
            <div className={`${classes.FooterContent} position-relative`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className={classes.FooterInfo}>
                                <h3>My<span>farm</span></h3>
                                <p>
                                    A108 Adam Street <br/>
                                    NY 535022, Kenya<br/><br/>
                                    <strong>Phone:</strong> +254 22 225 66<br/>
                                    <strong>Email:</strong> info@example.com<br/>
                                </p>
                                <div className={`${classes.SocialLinks} d-flex mt-3`}>
                                    {socialLinks.map(link => (
                                        <a key={link.name} href={link.to}
                                           className="d-flex align-items-center justify-content-center">
                                            <Icon icon={`bi:${link.icon}`}/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <FooterLinks title="Useful Links" links={usefulLinks}/>
                        <FooterLinks title="Our Services" links={ourServicesLinks}/>
                        <FooterLinks title="Our Services" links={ourServicesLinks}/>
                        <FooterLinks title="Our Services" links={ourServicesLinks}/>
                    </div>
                </div>
            </div>
            <div className={`${classes.FooterLegal} text-center position-relative`}>
                <div className="container">
                    <div className={classes.Copyright}>
                        &copy; Copyright <strong><span>myFarm</span></strong>. All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer



