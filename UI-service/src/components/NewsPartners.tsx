import React from 'react';

const NewsPartners: React.FC = () => {
    const newsOutlets = [
        { name: 'CNN', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg' },
        { name: 'WSJ', logo: 'https://s.wsj.net/img/meta/wsj-social-share.png' },
        { name: 'Independent', logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/55608e30737273.5630ac2fea960.png' },
        { name: 'NewYorkTimes', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg' },
        { name: 'Economist', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpxujN4fNbMgeOnuZoH_U0ykxT8pDjcgl1Q&s' },
        { name: 'BBC', logo: 'https://www.hatchwise.com/wp-content/uploads/2023/03/BBC-Logo-768x432-1.jpeg' },
        { name: 'CNBC', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8AX1afCcibi77vxgifFNkihOICxsAmq4eg&s' },
        { name: 'Fox News', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/100px-Fox_News_Channel_logo.svg.png' },
    ];

    // Double the array to create seamless loop
    const allOutlets = [...newsOutlets, ...newsOutlets];

    return (
        <section className="py-12 overflow-hidden bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h4 className="text-xl text-secondary-text text-center font-medium">
                        Our Partners
                    </h4>
                </div>

                <div className="relative">
                    {/* Gradient Overlay - Left */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>

                    {/* Scrolling Container */}
                    <div className="flex overflow-hidden">
                        <div className="flex animate-scroll whitespace-nowrap animate-infinite-X-scroll">
                            {allOutlets.map((outlet, index) => (
                                <div
                                    key={`${outlet.name}-${index}`}
                                    className="flex items-center justify-center min-w-[200px] px-8"
                                >
                                    <div className="flex items-center gap-2 text-primary-text hover:text-red-500 transition-colors">
                                        <img src={outlet.logo} alt={outlet.name} className="rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gradient Overlay - Right */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
                </div>
            </div>
        </section>
    );
};

export default NewsPartners;