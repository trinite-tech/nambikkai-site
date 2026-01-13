export const metadata = {
  title: "பற்றி - நம்பிக்கை செய்திகள்",
  description: "நம்பிக்கை செய்திகளைப் பற்றி அறிக",
}

export default function AboutPage() {
  return (
    <main className="bg-[#003d7a] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">பற்றி</h1>
          <div className="h-1 w-20 bg-[#e60000]"></div>
        </div>

        {/* About Content */}
        <div className="bg-[#1d4e89] text-white p-8 rounded-lg mb-8">
          <h2 className="text-3xl font-bold mb-6 text-[#e60000]">நம்பிக்கை செய்திகள் பற்றி</h2>

          <div className="space-y-6 text-gray-100">
            <p className="text-lg leading-relaxed">
              நம்பிக்கை செய்திகள் தமிழ்நாட்டு மக்களுக்கான ஒரு நம்பகமான செய்திச் சேவை வழங்குகிறது. நாம் தினசரி செய்திகளை, விளக்கக் கட்டுரைகளை,
              மற்றும் ஆழ்ந்த ஆய்வுகளை வழங்குகிறோம்.
            </p>

            <h3 className="text-2xl font-bold text-[#e60000] mt-8">எங்கள் பணி</h3>
            <p className="text-lg leading-relaxed">
              தமிழ் சமூகத்திற்கு மிக்க நம்பகமான, நிபுணதர்கூடிய, மற்றும் கடமை உணர்ந்த செய்திகளை வழங்குவது நமது முக்கிய இலக்கு. நாம் விশ்বாசம்
              மற்றும் সততையுடன் செய்தித்தொகுப்பை நடத்துகிறோம்.
            </p>

            <h3 className="text-2xl font-bold text-[#e60000] mt-8">பெட்రிকொர் எண்டरप्रैप्राइजेस்</h3>
            <p className="text-lg leading-relaxed">
              பெட்రிகொர் எण్టरપ్रাइజేస் நம్బిక్క సডిఎన్ బిహెచ్డి, మలేషియాతో భాగీదారిత్వం కుంచిస్తూ భారతదేశంలో చరిత్ర కంటెంట్ మరియు ఈవెంట్‌లు నిర్వహించడానికి అధికారం
              కలిగి ఉన్నది.
            </p>

            <div className="bg-[#003d7a] p-6 rounded mt-6 border-l-4 border-[#e60000]">
              <p className="text-sm text-gray-300">
                <strong>లైసెన్స్ సమాచారం:</strong> బెట్రిచర్‌ సంస్థ నాంబికై ఎస్‌డిఎన్‌ బిహెచ్‌డి (1434468-యూ) రిజిస్ట్రేషన్ సంఖ్య, 55, జలాన్ టిపీకె 2/8, తామన్
                పెరిండస్త్రియల్ కిన్రరా, 47180 పుచోంగ్, సెలాంగూర్, మలేషియ యొక్క లైసెన్స్‌కర్త భాగీదారు మరియు 'నాంబికై' బ్రాండ్ మరియు దాని లోగోను ఉపయోగించటానికి
                సంబంధితంగా ఉన్నది.
              </p>
            </div>
          </div>
        </div>

        {/* Team & Values */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1d4e89] text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#e60000] mb-4">எங்கள் மூल்யங்கள்</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#e60000] font-bold text-xl">✓</span>
                <span className="text-gray-100">நம்பகத்தன்மை - தான மாசு இல்லாத செய்திகள்</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e60000] font-bold text-xl">✓</span>
                <span className="text-gray-100">சுதந்திரம் - முறையற்ற செய்திக்கு எதிரான போராட்டம்</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e60000] font-bold text-xl">✓</span>
                <span className="text-gray-100">பொறுப்பு - தமிழ் சமூகத்தின் முன் கணக்கை வைப்பது</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#e60000] font-bold text-xl">✓</span>
                <span className="text-gray-100">சமத்துவம் - அனைவரின் மாறுபட்ட பார்வைகளை மரியாதை செய்தல்</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#1d4e89] text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-[#e60000] mb-4">தொடர்பு கொள்ளுங்கள்</h3>
            <div className="space-y-4 text-gray-100">
              <div>
                <p className="font-bold text-[#e60000]">சாதாரண மின்னஞ்சல்</p>
                <p>contact@nambikkai.news</p>
              </div>
              <div>
                <p className="font-bold text-[#e60000]">விளம்பரத்திற்கு</p>
                <p>advertise@nambikkai.news</p>
              </div>
              <div>
                <p className="font-bold text-[#e60000]">தொலைபேசி</p>
                <p>+91 44 XXXX XXXX</p>
              </div>
              <div>
                <p className="font-bold text-[#e60000]">முகவரி</p>
                <p>சென்னை, தமிழ்நாடு, இந்தியா</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
