import React from 'react';
import '../assets/styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                {/* <div>
                contenu footer ici
                </div> */}
                <div className=" text-center custom-bg-footer py-2">
                    <p className="test67">&copy; 2025 Beer Catalog - Camille Janin. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
