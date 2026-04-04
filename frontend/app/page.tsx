export default function RestaurantMenu() {
  // 料理のデータ
  const menuItems = [
    { id: 1, name: "特製マルゲリータ", price: "¥1,200", desc: "新鮮なバジルとモッツァレラチーズ" },
    { id: 2, name: "濃厚カルボナーラ", price: "¥1,100", desc: "こだわりの卵とパンチェッタを使用" },
    { id: 3, name: "季節の彩りサラダ", price: "¥850", desc: "地元農家直送の有機野菜" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 font-serif">
      <header className="text-center mb-12 border-b-2 border-slate-200 pb-8">
        <h1 className="text-4xl font-bold text-slate-800">Restaurant Luly</h1>
        <p className="italic text-slate-500 mt-2">~ 本日の特別メニュー ~</p>
      </header>

      <div className="space-y-8">
        {menuItems.map((item) => (
          <div key={item.id} className="flex justify-between items-baseline border-b border-dotted border-slate-300 pb-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-700">{item.name}</h2>
              <p className="text-sm text-slate-500 italic">{item.desc}</p>
            </div>
            <span className="text-lg font-bold text-slate-800">{item.price}</span>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-slate-400">
        ※ すべて税込価格です
      </footer>
    </div>
  );
}