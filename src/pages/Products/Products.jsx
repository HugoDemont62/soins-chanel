const Products = () => {
  return (
    <div className="min-h-screen bg-chanel-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-elegant text-4xl md:text-6xl font-bold text-chanel-black mb-8 text-center">
          Nos Produits
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cartes de produits */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-chanel-beige to-chanel-gold"></div>
              <div className="p-6">
                <h3 className="text-elegant text-xl font-semibold text-chanel-black mb-2">
                  Produit {item}
                </h3>
                <p className="text-chanel-gray-600 mb-4">
                  Description du produit de soin Chanel avec ses bienfaits exceptionnels.
                </p>
                <button className="bg-chanel-black text-chanel-white px-6 py-2 rounded hover:bg-chanel-gray-800 transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;