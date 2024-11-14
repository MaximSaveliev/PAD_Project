import React from 'react';

const HeroSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Entertainment Industry Prepares for Major Film Release",
      imageUrl: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      source: "CNN",
      sourceLogoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgT-R52bE5nFi11FvXv3Er0ADTmXuBd3ieeQ&s",
      date: "NOV 9TH 2024",
      featured: true
    },
    {
      id: 2,
      title: "Sports League Considers New Business Strategy",
      imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      source: "ESPN",
      sourceLogoUrl: "https://i0.wp.com/creativeaudiolab.com/wp-content/uploads/2014/10/espn-logo-square1.jpg?fit=300%2C300&ssl=1",
      date: "NOV 8TH 2024",
      featured: true
    },
    {
      id: 3,
      title: "Auto Manufacturer Updates EV Production Plans",
      imageUrl: "https://plus.unsplash.com/premium_photo-1694557306687-50d31dca6f89?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      source: "WSJ",
      sourceLogoUrl: "https://avatars.githubusercontent.com/u/15697446?s=280&v=4",
      date: "NOV 8TH 2024"
    },
    {
      id: 4,
      title: "Major Sports Team Announces Financial Milestone",
      imageUrl: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      source: "Forbes",
      sourceLogoUrl: "https://seekvectors.com/files/download/Forbes-Logo-20.jpg",
      date: "NOV 8TH 2024"
    },
    {
      id: 5,
      title: "Market Analysis Predicts Economic Shifts",
      imageUrl: "https://images.unsplash.com/photo-1601760562234-9814eea6663a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      source: "Bloomberg",
      sourceLogoUrl: "https://e7.pngegg.com/pngimages/727/671/png-clipart-bloomberg-round-logo-icons-logos-emojis-iconic-brands-thumbnail.png",
      date: "NOV 7TH 2024"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Main container - stack vertically on mobile, 2 columns on md+ */}
      <div className="flex flex-col gap-6">
        {/* Featured Articles Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Article */}
          <div className="relative group overflow-hidden">
            <a href="#" className="block h-full">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={newsItems[0].imageUrl}
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3 group-hover:underline group-hover:underline-offset-3">
                    {newsItems[0].title}
                  </h2>
                  <div className="flex items-center space-x-2 text-white/80 text-sm md:text-base">
                    <img
                      src={newsItems[0].sourceLogoUrl}
                      alt={newsItems[0].source}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{newsItems[0].source}</span>
                    <span>|</span>
                    <span>{newsItems[0].date}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Second Article */}
          <div className="relative group overflow-hidden">
            <a href="#" className="block h-full">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={newsItems[1].imageUrl}
                  alt={newsItems[1].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3 group-hover:underline group-hover:underline-offset-3">
                    {newsItems[1].title}
                  </h2>
                  <div className="flex items-center space-x-2 text-white/80 text-sm md:text-base">
                    <img
                      src={newsItems[1].sourceLogoUrl}
                      alt={newsItems[1].source}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{newsItems[1].source}</span>
                    <span>|</span>
                    <span>{newsItems[1].date}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.slice(2).map((item) => (
            <div key={item.id} className="overflow-hidden group">
              <a href="#" className="block h-full">
                <div className="p-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2 group-hover:underline group-hover:underline-offset-3">{item.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <img
                        src={item.sourceLogoUrl}
                        alt={item.source}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{item.source}</span>
                      <span>|</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;