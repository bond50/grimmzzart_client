import classes from './Footer.module.css'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

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
    const {data, loading, error} = useSelector((state) => state.brandsCategoriesSubs);
    const {categories, subs, brands} = data;

    const usefulLinks = [
        {label: 'Home', url: '/'},
        {label: 'About us', url: '/about'},
        {label: 'Help', url: 'help'},
    ];


    const socialLinks = [
        {name: 'Twitter', icon: 'twitter', to: '/'},
        {name: 'Facebook', icon: 'facebook', to: '/'},
        {name: 'Instagram', icon: 'instagram', to: '/'},
        {name: 'LinkedIn', icon: 'linkedin', to: '/'},
    ];
    const categoryLinks = categories.map(category => ({
        label: category.name,
        url: `/categories/${category.slug}`
    }));

    const brandLinks = brands.map(b => ({
        label: b.name,
        url: `/brands/${b.slug}`
    }));
    const subsLinks = subs.map(s => ({
        label: s.name,
        url: `/subs/${s.slug}`
    }));

    return (
        <footer className={classes.Footer}>
            <div className={`${classes.FooterContent} position-relative`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className={classes.FooterInfo}>
                                <h3>{process.env.REACT_APP_APPNAME}</h3>
                                <p>
                                    {/*A108 Adam Street <br/>*/}
                                    {/*NY 535022, Kenya<br/><br/>*/}
                                    <strong>Phone:</strong> +254 707878689<br/>
                                    <strong>Email:</strong> info@grimmzmart.com<br/>
                                </p>
                                {/*<div className={`${classes.SocialLinks} d-flex mt-3`}>*/}
                                {/*    {socialLinks.map(link => (*/}
                                {/*        <a key={link.name} href={link.to}*/}
                                {/*           className="d-flex align-items-center justify-content-center">*/}
                                {/*            <Icon icon={`bi:${link.icon}`}/>*/}
                                {/*        </a>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <FooterLinks title="Useful Links" links={usefulLinks}/>
                        <FooterLinks title="Top brands" links={brandLinks}/>
                        <FooterLinks title="categories" links={categoryLinks}/>
                        <FooterLinks title="Sub categories" links={subsLinks}/>

                    </div>
                </div>
            </div>
            <div className={`${classes.FooterLegal} text-center position-relative`}>
                <div className="container">
                    <div className={classes.Copyright}>
                        &copy; Copyright <strong><span>{process.env.REACT_APP_APPNAME}</span></strong>. All Rights
                        Reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer



