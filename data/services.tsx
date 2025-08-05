import React, { useState } from 'react';

interface Service {
  id: number;
  name: string;
  description: string;
}

const services: Service[] = [
  { id: 1, name: "Website Development", description: "Build modern and responsive websites." },
  { id: 2, name: "Photography", description: "Capture stunning visuals for your projects." },
  { id: 3, name: "Web Design", description: "Design user-friendly and aesthetic web interfaces." },
  { id: 4, name: "App Development", description: "Develop mobile and desktop applications." },
  { id: 5, name: "Video Editing", description: "Edit and produce high-quality videos." },
  { id: 6, name: "SEO Services", description: "Optimize your website for search engines." },
];

const ServicesPage = () => {
  const [basket, setBasket] = useState<Service[]>([]);

  const addToBasket = (service: Service) => {
    if (!basket.find((item) => item.id === service.id)) {
      setBasket((prevBasket) => [...prevBasket, service]);
    }
  };

  const submitBasket = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted services: ${basket.map((item) => item.name).join(', ')}`);
    setBasket([]);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Our Services</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Service</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Description</th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{service.name}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">{service.description}</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                <button
                  onClick={() => addToBasket(service)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add to Basket
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {basket.length > 0 && (
        <form onSubmit={submitBasket} className="mt-10 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Basket</h2>
          <ul className="list-disc list-inside space-y-2">
            {basket.map((item) => (
              <li key={item.id} className="text-gray-700 dark:text-gray-300">{item.name}</li>
            ))}
          </ul>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Basket
          </button>
        </form>
      )}
    </div>
  );
};

export default ServicesPage;