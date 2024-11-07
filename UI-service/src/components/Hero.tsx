import React from 'react'

const Hero = () => {
  return (
    <section className="text-primary-text container flex flex-col md:flex-row gap-8 p-6 mx-auto">
      {/* Left Side - Large Article */}
      <div className="md:w-2/3 bg-secondary-background p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Main Article Title</h2>
        <p className="text-secondary-text mb-4">
          This is the main article content. It takes up more space and is highlighted to catch attention.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-secondary-text rounded-lg hover:bg-blue-600">
          Read More
        </button>
      </div>

      {/* Right Side - Small Articles */}
      <div className="md:w-1/3 flex flex-col gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-secondary-background p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Small Article {item}</h3>
            <p className="text-secondary-text">Brief description of the article content...</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
