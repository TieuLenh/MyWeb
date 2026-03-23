import { useState, useEffect, useRef } from 'react';
import { API_BASE } from '../config';

function SearchBox({ onResults = () => {}, className = 'SearchBox', ...props }) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileSearchActive, setMobileSearchActive] = useState(false);
    const [history, setHistory] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 768px)');
        const handleMedia = (e) => setIsMobile(e.matches);
        setIsMobile(media.matches);
        if (media.addEventListener) {
            media.addEventListener('change', handleMedia);
        } else {
            media.addListener(handleMedia);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', handleMedia);
            } else {
                media.removeListener(handleMedia);
            }
        };
    }, []);

    useEffect(() => {
        const onClickOutside = (event) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(event.target)) {
                setMobileSearchActive(false);
            }
        };

        if (mobileSearchActive) {
            document.addEventListener('mousedown', onClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [mobileSearchActive]);

    const addToHistory = (text) => {
        const clean = (text || '').trim();
        if (!clean) return;
        setHistory((prev) => [clean, ...prev.filter((v) => v !== clean)].slice(0, 8));
        // TODO: sync with user account when login
    };

    const triggerSearch = async (value) => {
        const term = value || query;
        if (!term.trim()) return;
        setQuery(term);
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/search?query=${encodeURIComponent(term)}`);
            if (!response.ok) throw new Error('Search failed');
            const results = await response.json();
            onResults(results);
            addToHistory(term);
        } catch (error) {
            console.error('Search error:', error);
            onResults([]);
        } finally {
            setLoading(false);
            if (isMobile) setMobileSearchActive(false);
        }
    };

    const handleSearch = async (e) => {
        if (isMobile && !mobileSearchActive) {
            e.preventDefault();
            setMobileSearchActive(true);
            return;
        }

        e.preventDefault();
        await triggerSearch(query);
    };

    const handleHistoryClick = async (value) => {
        setQuery(value);
        await triggerSearch(value);
    };


    return (
        <div ref={containerRef} className={`${className} ${mobileSearchActive ? 'search-active' : ''}`} {...props}>
            <form onSubmit={handleSearch} className="SearchBox-form">
                {(!isMobile || mobileSearchActive) && (
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="search-input"
                        disabled={loading}
                        autoFocus={mobileSearchActive}
                    />
                )}
                <button
                    type="submit"
                    disabled={loading && !mobileSearchActive}
                    className="search-button"
                    aria-label="Tìm kiếm"
                >
                {loading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                )}
            </button>
            {mobileSearchActive && isMobile && (
                <div className="search-history-dropdown">
                    {history.length > 0 ? (
                        history.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleHistoryClick(item)}
                                className="history-item"
                            >
                                {item}
                            </button>
                        ))
                    ) : (
                        <div className="history-empty">Chưa có lịch sử tìm kiếm</div>
                    )}
                </div>
            )}
        </form>
    </div>
    );
}

export default SearchBox;
