
const Footer = () => {
    return (
        <footer className="footer grid grid-cols-2 lg:flex lg:gap-52 lg:px-72 bg-base-200 text-base-content p-10">
            <nav className="flex items-center justify-center flex-col w-full lg:items-start">
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="flex items-center justify-center flex-col w-full lg:items-start">
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="col-span-2 flex items-center justify-center flex-col w-full lg:items-start">
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <form className="col-span-2 flex items-center justify-center flex-col w-full lg:items-start">
                <h6 className="footer-title">News letter</h6>
                <fieldset className="form-controlw-80 flex items-center justify-center flex-col lg:block">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="join">
                        <input
                        type="text"
                        placeholder="username@site.com"
                        className="input input-bordered join-item" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </footer>
    );
};

export default Footer;
