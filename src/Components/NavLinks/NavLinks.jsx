

const NavLinks = ({label}) => {

  return (
    <span className={`link gro`}>
      <span className="mask">
        <div className="link-container">
          <span className="link-title1 title">{label}</span>
          <span className="link-title2 title">{label}</span>
        </div>
      </span>
    </span>
  );
};

export default NavLinks;
