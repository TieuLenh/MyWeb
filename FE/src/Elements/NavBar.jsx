

function NavBar({ items = [], className = 'Nav-container', ...props }) {
    if (!items.length) return null;
    return (
        <nav 
            className={className} 
            {...props}
        >
            <ul className="Nav-list">
                {items.map( item => (
                    <li key={item.href + item.label}>
                        <a href={item.href}> {item.label}</a>
                    </li>
                    ))}
            </ul>
        </nav>
    );
}

export default NavBar;
