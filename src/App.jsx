import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  MessageCircle, 
  Music, 
  Trophy, 
  User, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  Minimize2, 
  Maximize2,
  TrendingDown,
  Calendar,
  Heart,
  Sparkles,
  ChefHat,
  Send,
  Loader2,
  Save,
  Target,
  Ruler,
  Weight,
  Droplets,
  Camera,
  BookOpen,
  Timer,
  Flame,
  Smile,
  Frown,
  Zap,
  ShoppingCart,
  Lightbulb,
  LightbulbOff,
  Check,
  Image as ImageIcon
} from 'lucide-react';

// --- CONFIGURAÇÃO E DADOS ---

const USER_NAME = "Raylany";
const PANDA_NAME = "Pandinha Ray";

const WATER_TIPS = [
  "Domingo: Beber água ajuda a curar a ressaca (de açúcar também!). Hidrate-se para começar a semana bem!",
  "Segunda: Sabia? Água em jejum ativa o cérebro mais rápido que café. Bora acordar esse corpo!",
  "Terça: Hidratação correta reduz o inchaço abdominal. Quer barriga chapada? Bebe água!",
  "Quarta: Beber 500ml de água 30min antes das refeições ajuda a comer menos. Truque de mestre!",
  "Quinta: Músculos bem hidratados rendem 20% a mais no treino. Força na peruca!",
  "Sexta: A água melhora a elasticidade da pele e previne rugas. Fonte da juventude, Ray!",
  "Sábado: Vai tomar umas? Intercale com água para não destruir a dieta (e o fígado)."
];

const WEEKLY_WORKOUTS = {
  1: { // Segunda
    title: "Segunda: Pernas de Aço",
    exercises: [
      { name: "Agachamento Livre", sets: "4x 15", desc: "Pés na largura do ombro, desce como se fosse sentar." },
      { name: "Afundo", sets: "3x 12 cada", desc: "Passo largo a frente, joelho no chão." },
      { name: "Elevação Pélvica", sets: "4x 20", desc: "Contrai bem o glúteo lá em cima!" },
      { name: "Panturrilha no Degrau", sets: "3x 20", desc: "Sobe e desce devagar." }
    ]
  },
  2: { // Terça
    title: "Terça: Cardio & Braços",
    exercises: [
      { name: "Polichinelos", sets: "3x 1 min", desc: "Sem parar, ritmo acelerado!" },
      { name: "Flexão de Braço (joelho)", sets: "3x 10", desc: "Peito no chão, força!" },
      { name: "Tríceps Banco", sets: "3x 12", desc: "Use uma cadeira firme." },
      { name: "Corrida Estacionária", sets: "10 min", desc: "Joelho alto, simulando corrida." }
    ]
  },
  3: { // Quarta
    title: "Quarta: Abdomem Trincado",
    exercises: [
      { name: "Abdominal Supra", sets: "4x 20", desc: "Tira as costas do chão." },
      { name: "Prancha Isométrica", sets: "3x 40seg", desc: "Segura tremendo, mas não cai!" },
      { name: "Abdominal Infra", sets: "3x 15", desc: "Pernas esticadas, sobe e desce." },
      { name: "Russian Twist", sets: "3x 20", desc: "Gira o tronco de um lado pro outro." }
    ]
  },
  4: { // Quinta
    title: "Quinta: Glúteo & Posterior",
    exercises: [
      { name: "Agachamento Sumô", sets: "4x 15", desc: "Pés afastados, ponta pra fora." },
      { name: "4 Apoios (Glúteo)", sets: "3x 20 cada", desc: "Chuta lá pro teto." },
      { name: "Stiff com Garrafa Pet", sets: "3x 15", desc: "Pernas semi-flexionadas, desce o tronco." },
      { name: "Elevação Pélvica Unilateral", sets: "3x 12", desc: "Uma perna só apoiada." }
    ]
  },
  5: { // Sexta
    title: "Sexta: Full Body (Matador)",
    exercises: [
      { name: "Burpees", sets: "3x 10", desc: "O terror da nutri: chão, sobe, pula!" },
      { name: "Agachamento com Salto", sets: "3x 15", desc: "Agacha e explode pra cima." },
      { name: "Flexão de Braço", sets: "3x Falha", desc: "O máximo que conseguir." },
      { name: "Corrida no Lugar", sets: "5 min", desc: "Pra fechar a semana suando." }
    ]
  }
};

const CHEAP_RECIPES_LIST = [
  { name: "Crepioca da Ray", ingredients: "1 ovo, 2 colheres de goma de tapioca, sal", desc: "Mistura tudo, frigideira untada. Recheia com queijo ou frango." },
  { name: "Panqueca de Banana Fit", ingredients: "1 banana amassada, 1 ovo, canela", desc: "Amassa a banana, mistura o ovo e frita. Fica doce e sustenta!" },
  { name: "Escondidinho de Batata Doce", ingredients: "Batata doce cozida, frango desfiado", desc: "Amassa a batata, faz uma cama, recheia com frango e cobre. Forno!" },
  { name: "Omelete de Forno", ingredients: "3 ovos, tomate, cebola, sobras de legumes", desc: "Bate os ovos, mistura tudo, põe na forma e assa. Prático demais." },
  { name: "Salada de Atum Econômica", ingredients: "1 lata de atum, alface, tomate, milho", desc: "Só misturar. Jantar leve e proteico." }
];

const SHOPPING_LIST_ITEMS = [
    "Ovos (Muitos ovos!)",
    "Batata Doce",
    "Frango (Peito)",
    "Aveia em Flocos",
    "Banana Prata",
    "Goma de Tapioca",
    "Atum em Lata",
    "Tomate/Cebola",
    "Cuscuz (Flocão)",
    "Canela em pó"
];

const SCOLD_MESSAGES = [
  "RAYLANY SUBTIL! Que vergonha!",
  "Poxa Ray, assim o Panda vira uma bola de novo...",
  "Tá achando que a gordura sai sozinha? Vai treinar!",
  "Faltou por quê? Preguiça não queima caloria!"
];

const MOTIVATION_QUOTES = [
    "Tá doendo? É a gordura chorando! Bora Ray!",
    "Desliga o Netflix e liga o modo MONSTRO!",
    "Se fosse fácil, todo mundo era magro. Você é guerreira!",
    "Pensa no biquíni de lacinho! VAI!",
    "30 minutos de dor, 24 horas de orgulho!"
];

// --- SERVIÇO GEMINI AI ---
// MODIFICADO: Agora aceita imagemBase64!
const callGemini = async (prompt, systemInstruction, imageBase64 = null) => {
  const apiKey = "AIzaSyBYbLrXpbpx7V0yBcM8uQypeUhUoJvoMzg"; // ⚠️ COLOQUE SUA API KEY AQUI PARA A NUTRI VER A FOTO!
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  let userParts = [{ text: prompt }];
  
  // Se tiver imagem, adiciona no payload
  if (imageBase64) {
    userParts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64
      }
    });
  }

  const payload = {
    contents: [{ role: "user", parts: userParts }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Ops, a Nutri foi beber água. Tenta de novo!";
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Minha prancheta caiu (erro na conexão), tenta de novo!";
  }
};

const NUTRI_SYSTEM_PROMPT = `
Você é a "Nutri da Raylany". Sua personalidade é uma mistura de "Tia da Merenda" carinhosa com "Sargento Fitness".
O nome da sua paciente é Raylany Subtil. Ela ama pandas e músicas dos anos 2000.
SEU OBJETIVO: Ajudar Raylany a emagrecer com receitas BARATAS e ACESSÍVEIS.
ESTILO DE FALA: Use gírias leves, seja engraçada, mas dê bronca se ela falar que comeu besteira. Use emojis.
SE RECEBER UMA FOTO: Analise a imagem com cuidado.
- Se for comida saudável: Elogie muito!
- Se for "gordice" (pizza, doce, fritura): Dê uma bronca engraçada!
- Se for foto dela (corpo): Motive e diga que o Panda tá ficando fit.
- Se não for nada disso: Faça uma piada.
`;

const RECIPE_SYSTEM_PROMPT = `
Você é um Chef de Cozinha especialista em "Culinária da Sobrevivência Fit".
A Raylany vai te dar uma lista de ingredientes (o que tem na geladeira).
Sua missão: Criar uma receita FIT e gostosa usando APENAS (ou principalmente) esses ingredientes + básicos (sal, óleo, água).
A receita deve ser BARATA e simples. Dê um nome criativo e engraçado para o prato.
Formato:
🍳 [Nome do Prato Engraçado]
📝 Ingredientes: ...
🔥 Como fazer: ...
💪 Por que é bom pra Raylany: ...
`;

// --- COMPONENTES ---

const PandaAvatar = ({ bmi }) => {
  const scale = Math.max(0.8, Math.min(1.5, bmi / 22)); 
  
  return (
    <div className="relative w-48 h-48 mx-auto transition-all duration-700 ease-in-out">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl animate-bounce-slow">
        <style>
            {`
            @keyframes breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            .animate-breathe { animation: breathe 3s infinite ease-in-out; }
            `}
        </style>
        <g className="animate-breathe">
            <g transform={`translate(100, 100) scale(${scale}, 1) translate(-100, -100)`}>
            {/* Corpo */}
            <ellipse cx="100" cy="120" rx="70" ry="60" fill="white" stroke="#333" strokeWidth="3"/>
            
            {/* Roupinha da Ray */}
            <path d="M 45 100 Q 100 150 155 100 L 155 150 Q 100 180 45 150 Z" fill="#FF69B4" stroke="#D147A3" strokeWidth="2" />
            <text x="100" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">RAY SUBTIL</text>
            </g>
            
            <g transform={`translate(0, ${scale > 1.2 ? 10 : 0})`}>
            {/* Orelhas */}
            <circle cx="65" cy="50" r="15" fill="#333" /> 
            <circle cx="135" cy="50" r="15" fill="#333" /> 
            {/* Cabeça */}
            <circle cx="100" cy="65" r="40" fill="white" stroke="#333" strokeWidth="3" />
            
            {/* Rosto */}
            <ellipse cx="85" cy="60" rx="12" ry="15" fill="#333" transform="rotate(-15 85 60)" />
            <ellipse cx="115" cy="60" rx="12" ry="15" fill="#333" transform="rotate(15 115 60)" />
            <circle cx="85" cy="58" r="4" fill="white" />
            <circle cx="115" cy="58" r="4" fill="white" />
            <ellipse cx="100" cy="75" rx="6" ry="4" fill="#333" />
            {scale > 1.3 ? (
                <path d="M 90 85 Q 100 80 110 85" stroke="#333" strokeWidth="2" fill="none" />
            ) : (
                <path d="M 90 85 Q 100 95 110 85" stroke="#333" strokeWidth="2" fill="none" />
            )}
            </g>

            {/* Patas */}
            <g transform={`translate(100, 100) scale(${scale}, 1) translate(-100, -100)`}>
            <ellipse cx="40" cy="110" rx="15" ry="10" fill="#333" transform="rotate(-20)" />
            <ellipse cx="160" cy="110" rx="15" ry="10" fill="#333" transform="rotate(20)" />
            <ellipse cx="60" cy="170" rx="18" ry="12" fill="#333" />
            <ellipse cx="140" cy="170" rx="18" ry="12" fill="#333" />
            </g>
        </g>
      </svg>
      {scale > 1.3 && <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">Tô pesado!</div>}
      {scale <= 1.1 && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">Fit!</div>}
    </div>
  );
};

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEsporro, setShowEsporro] = useState(false);
  const [esporroText, setEsporroText] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [waterCount, setWaterCount] = useState(0);
  
  // State Lista de Compras Interativa
  const [shoppingItems, setShoppingItems] = useState(
    SHOPPING_LIST_ITEMS.map(item => ({ name: item, checked: false }))
  );

  // Screen Wake Lock State
  const [isScreenLockActive, setIsScreenLockActive] = useState(false);
  const wakeLockRef = useRef(null);
  
  // Camera Ref
  const fileInputRef = useRef(null);

  // Dados do Usuário
  const [user, setUser] = useState({
    weight: 85.0,
    height: 1.65,
    goalWeight: 65.0,
    startWeight: 85.0,
    level: 1,
    xp: 0,
    streak: 0,
    startDate: '2023-11-24',
    history: []
  });

  // State Workouts
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [showStartAnimation, setShowStartAnimation] = useState(false);
  
  // State Mood
  const [todayMood, setTodayMood] = useState(null);

  // State temporário para edição na aba Metas
  const [editForm, setEditForm] = useState({
    weight: 85.0,
    height: 1.65,
    goalWeight: 65.0
  });

  const [chatMessages, setChatMessages] = useState([
    { sender: 'nutri', text: `Oi Raylany! Sou sua Nutri Virtual. Vamos focar nessas gordurinhas? Pode falar comigo sobre qualquer coisa ou mandar foto do prato!` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isMusicMini, setIsMusicMini] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  // --- LOGIC ---

  const todayIndex = new Date().getDay();
  const waterTip = WATER_TIPS[todayIndex];

  useEffect(() => {
    setEditForm({
        weight: user.weight,
        height: user.height,
        goalWeight: user.goalWeight
    });
  }, [user.weight, user.height, user.goalWeight]);

  const calculateBMI = (w, h) => w / (h * h);
  const currentBMI = calculateBMI(user.weight, user.height);
  const xpToNextLevel = user.level * 100;

  const handleAction = (type) => {
    if (type === 'success') {
      const newXP = user.xp + 20;
      let newLevel = user.level;
      if (newXP >= xpToNextLevel) newLevel += 1;
      setUser(prev => ({
        ...prev,
        xp: newXP >= xpToNextLevel ? newXP - xpToNextLevel : newXP,
        level: newLevel,
        streak: prev.streak + 1
      }));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setIsWorkoutActive(false); 
    } else {
      const randomMsg = SCOLD_MESSAGES[Math.floor(Math.random() * SCOLD_MESSAGES.length)];
      setEsporroText(randomMsg);
      setShowEsporro(true);
      setUser(prev => ({ ...prev, streak: 0 }));
    }
  };

  const handleMood = (mood) => {
    setTodayMood(mood);
    let msg = "";
    if (mood === 'happy') msg = "Isso aí Ray! Essa energia queima caloria! 🤩";
    if (mood === 'lazy') msg = "Xô preguiça! Pensa no boleto pago e no biquíni! 😴";
    if (mood === 'angry') msg = "Calma, respira. Estresse engorda (hormônios, né?). Toma um chá! 🍵";
    if (mood === 'focus') msg = "Modo Focada ativado! O Panda tá orgulhoso! 🥗";
    
    setChatMessages(prev => [...prev, { sender: 'nutri', text: msg }]);
    alert("Nutri diz: " + msg);
  };

  const toggleScreenLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsScreenLockActive(false);
      } else {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          setIsScreenLockActive(true);
        } else {
          alert("Seu navegador não suporta controle de tela, mas tente manter o app aberto!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar manter a tela ligada.");
    }
  };

  const handleToggleShoppingItem = (index) => {
    const newItems = [...shoppingItems];
    newItems[index].checked = !newItems[index].checked;
    setShoppingItems(newItems);
  };

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
    setShowStartAnimation(true);
    setTimeout(() => setShowStartAnimation(false), 3500);
  };

  const handleSaveGoals = () => {
    setUser(prev => ({
        ...prev,
        weight: parseFloat(editForm.weight),
        height: parseFloat(editForm.height),
        goalWeight: parseFloat(editForm.goalWeight)
    }));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    alert("Dados atualizados Ray! O Panda já sentiu a diferença!");
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMsgs = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(newMsgs);
    setChatInput('');
    setLoadingAI(true);

    if (userText.toLowerCase().includes('peso') && userText.match(/\d+(\.\d+)?/)) {
        const newWeight = parseFloat(userText.match(/\d+(\.\d+)?/)?.[0]);
        if (newWeight) {
           setUser(prev => ({ ...prev, weight: newWeight }));
        }
    }

    const aiResponse = await callGemini(
        `A Raylany disse: "${userText}". Peso atual dela: ${user.weight}kg. Altura: ${user.height}m.`, 
        NUTRI_SYSTEM_PROMPT
    );

    setChatMessages(prev => [...prev, { sender: 'nutri', text: aiResponse }]);
    setLoadingAI(false);
  };

  // Handler para clicar no botão da câmera e abrir o seletor de arquivo
  const triggerCamera = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  // Handler para processar a foto selecionada
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
        // 1. Mostrar prévia no chat
        const base64Full = reader.result;
        const newMsgs = [...chatMessages, { sender: 'user', text: "📸 [Foto Enviada]", image: base64Full }];
        setChatMessages(newMsgs);
        setLoadingAI(true);

        // 2. Preparar Base64 puro para a API (sem o header data:image/...)
        const base64Raw = base64Full.split(',')[1];

        // 3. Chamar o Gemini com a Imagem
        const aiResponse = await callGemini(
            "Analise esta imagem que a Raylany enviou. É comida? É o corpo dela? Seja a nutricionista engraçada e dê sua opinião.",
            NUTRI_SYSTEM_PROMPT,
            base64Raw
        );

        setChatMessages(prev => [...prev, { sender: 'nutri', text: aiResponse }]);
        setLoadingAI(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateRecipe = async () => {
    if (!ingredientsInput.trim()) return;
    setLoadingAI(true);
    
    const userMsg = `Nutri, tenho isso na geladeira: ${ingredientsInput}. O que eu faço? ✨`;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setShowRecipeModal(false);
    setIngredientsInput("");
    setActiveTab('nutri'); 

    const aiResponse = await callGemini(
        `Ingredientes disponíveis: ${ingredientsInput}.`, 
        RECIPE_SYSTEM_PROMPT
    );

    setChatMessages(prev => [...prev, { sender: 'nutri', text: aiResponse }]);
    setLoadingAI(false);
  };

  // --- RENDERERS ---

  const renderDashboard = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <Sparkles className="absolute top-2 right-10 text-white/20 w-12 h-12 animate-pulse" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h1 className="text-2xl font-bold">Olá, {USER_NAME}!</h1>
            <p className="opacity-90 text-sm">Nível {user.level} • {user.streak} dias seguidos 🔥</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
             <Trophy className="w-6 h-6 text-yellow-300" />
          </div>
        </div>
        
        <div className="mt-6 flex items-end gap-2 relative z-10">
            <span className="text-4xl font-bold">{user.weight}</span>
            <span className="text-lg opacity-80 mb-1">kg</span>
            <div className="ml-auto text-right">
                <p className="text-xs opacity-75">Meta</p>
                <p className="font-bold">{user.goalWeight} kg</p>
            </div>
        </div>

        <div className="mt-4 relative z-10">
            <div className="flex justify-between text-xs mb-1 opacity-90">
                <span>XP Atual</span>
                <span>{user.xp} / {xpToNextLevel}</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-yellow-400 transition-all duration-500" 
                    style={{ width: `${(user.xp / xpToNextLevel) * 100}%` }}
                />
            </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-pink-200"></div>
        <h2 className="text-gray-600 font-bold mb-4 flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-pink-500" />
            Evolução do Panda
        </h2>
        <PandaAvatar bmi={currentBMI} />
        <p className="mt-4 text-sm text-gray-500">
            IMC Atual: <span className={`font-bold ${currentBMI > 25 ? 'text-orange-500' : 'text-green-500'}`}>{currentBMI.toFixed(1)}</span>
        </p>

        {/* Mood Tracker */}
        <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-3">Como você está hoje, Ray?</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => handleMood('happy')} className={`p-2 rounded-full text-2xl hover:scale-125 transition ${todayMood === 'happy' ? 'bg-yellow-100 scale-110' : 'grayscale hover:grayscale-0'}`}>🤩</button>
                <button onClick={() => handleMood('lazy')} className={`p-2 rounded-full text-2xl hover:scale-125 transition ${todayMood === 'lazy' ? 'bg-blue-100 scale-110' : 'grayscale hover:grayscale-0'}`}>😴</button>
                <button onClick={() => handleMood('angry')} className={`p-2 rounded-full text-2xl hover:scale-125 transition ${todayMood === 'angry' ? 'bg-red-100 scale-110' : 'grayscale hover:grayscale-0'}`}>😡</button>
                <button onClick={() => handleMood('focus')} className={`p-2 rounded-full text-2xl hover:scale-125 transition ${todayMood === 'focus' ? 'bg-green-100 scale-110' : 'grayscale hover:grayscale-0'}`}>🥗</button>
            </div>
        </div>
      </div>

      {/* Seção Água */}
      <div className="bg-blue-50 rounded-3xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-blue-800 flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Hidratação
            </h3>
            <span className="text-2xl font-bold text-blue-600">{waterCount}<span className="text-sm font-normal text-gray-500">/8 copos</span></span>
        </div>
        <div className="flex gap-2 mb-4">
            <button onClick={() => setWaterCount(Math.max(0, waterCount - 1))} className="bg-white p-2 rounded-full text-blue-500 shadow-sm">-</button>
            <div className="flex-1 bg-blue-200 rounded-full h-10 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-xs text-blue-900 font-bold z-10">{Math.round((waterCount/8)*100)}%</div>
                 <div className="h-full bg-blue-400 transition-all" style={{ width: `${(waterCount/8)*100}%` }}></div>
            </div>
            <button onClick={() => setWaterCount(waterCount + 1)} className="bg-blue-500 p-2 rounded-full text-white shadow-sm">+</button>
        </div>
        <div className="bg-white/60 p-3 rounded-xl text-xs text-blue-800 italic flex gap-2 items-start">
            <span className="text-lg">💡</span>
            {waterTip}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Check-in Diário
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => handleAction('success')}
                className="bg-green-100 hover:bg-green-200 active:scale-95 transition-all p-4 rounded-xl flex flex-col items-center gap-2 border-2 border-green-200"
            >
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <span className="font-bold text-green-800">Fiz tudo!</span>
            </button>
            <button 
                onClick={() => handleAction('fail')}
                className="bg-red-100 hover:bg-red-200 active:scale-95 transition-all p-4 rounded-xl flex flex-col items-center gap-2 border-2 border-red-200"
            >
                <XCircle className="w-8 h-8 text-red-600" />
                <span className="font-bold text-red-800">Faltei...</span>
            </button>
        </div>
      </div>
    </div>
  );

  const renderRecipes = () => (
    <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6 rounded-3xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                <Utensils className="w-6 h-6" />
                Cozinha da Ray
            </h2>
            <p className="opacity-90 text-sm">Receitas "BBB": Boas, Baratas e Brasileiras.</p>
        </div>

        {/* Botões Ação */}
        <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={() => setShowRecipeModal(true)}
                className="bg-white border-2 border-purple-500 text-purple-600 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:bg-purple-50 transition"
            >
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span className="font-bold text-xs">Mago da Geladeira</span>
            </button>
            <button 
                onClick={() => setShowShoppingList(true)}
                className="bg-white border-2 border-orange-500 text-orange-600 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:bg-orange-50 transition"
            >
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                <span className="font-bold text-xs">Lista de Compras</span>
            </button>
        </div>

        <h3 className="font-bold text-gray-700 mt-4 px-2">Receitas do Dia a Dia</h3>
        <div className="space-y-4">
            {CHEAP_RECIPES_LIST.map((recipe, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-orange-600 mb-1">{recipe.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">🛒 {recipe.ingredients}</p>
                    <div className="bg-orange-50 p-2 rounded-lg text-xs text-gray-700 italic">
                        "{recipe.desc}"
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderWorkouts = () => {
    const days = [
        { label: 'D', idx: 0 },
        { label: 'S', idx: 1 },
        { label: 'T', idx: 2 },
        { label: 'Q', idx: 3 },
        { label: 'Q', idx: 4 },
        { label: 'S', idx: 5 },
        { label: 'S', idx: 6 },
    ];

    const currentWorkout = WEEKLY_WORKOUTS[selectedDay];
    const isRestDay = selectedDay === 0 || selectedDay === 6;
    const isToday = selectedDay === todayIndex;

    return (
        <div className="space-y-6 pb-20 relative">
            <div className="flex justify-between bg-white p-2 rounded-2xl shadow-sm">
                {days.map((d) => (
                    <button
                        key={d.idx}
                        onClick={() => setSelectedDay(d.idx)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            selectedDay === d.idx 
                            ? 'bg-purple-500 text-white scale-110 shadow-md' 
                            : 'bg-gray-100 text-gray-400 hover:bg-purple-50'
                        } ${d.idx === todayIndex && selectedDay !== d.idx ? 'border-2 border-purple-500 text-purple-500' : ''}`}
                    >
                        {d.label}
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-purple-500">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {isToday ? "Treino de Hoje" : `Espiando ${days[selectedDay].label}...`}
                        </h2>
                        <p className="text-gray-500">
                            {isRestDay ? "Fim de Semana Livre! 😎" : currentWorkout?.title}
                        </p>
                    </div>
                    {isToday && (
                        <div className="bg-green-100 px-3 py-1 rounded-full text-xs text-green-700 font-bold animate-pulse">
                            AGORA!
                        </div>
                    )}
                </div>
            </div>

            {isToday && !isRestDay && (
                <div className="flex justify-center">
                    {!isWorkoutActive ? (
                        <button 
                            onClick={handleStartWorkout}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-xl py-4 px-10 rounded-full shadow-lg shadow-purple-200 transform transition active:scale-95 hover:scale-105 flex items-center gap-3 animate-bounce-slow"
                        >
                            <Flame className="w-6 h-6 text-yellow-300" />
                            INICIAR TREINO 🔥
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleAction('success')}
                            className="bg-green-500 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg shadow-green-200 transform transition active:scale-95 flex items-center gap-2"
                        >
                            <CheckCircle2 className="w-6 h-6" />
                            Concluir Treino ✅
                        </button>
                    )}
                </div>
            )}

            <div className={`space-y-3 transition-opacity duration-500 ${isWorkoutActive ? 'opacity-100' : 'opacity-80'}`}>
                {isRestDay ? (
                    <div className="bg-green-100 p-6 rounded-xl text-center">
                        <Heart className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <h3 className="font-bold text-green-800 text-lg">Descanso ou Cardio Extra!</h3>
                        <p className="text-green-700 text-sm mt-2">
                            Hoje é dia de descansar a musculatura ou fazer uma caminhada leve no parque. Aproveita Ray!
                        </p>
                    </div>
                ) : (
                    currentWorkout?.exercises.map((workout, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border-b-4 border-gray-50">
                            <div className={`p-3 rounded-full transition-colors ${isWorkoutActive ? 'bg-green-100' : 'bg-purple-100'}`}>
                                <Dumbbell className={`w-6 h-6 ${isWorkoutActive ? 'text-green-600' : 'text-purple-600'}`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{workout.name}</h4>
                                <p className="text-sm text-purple-600 font-semibold">{workout.sets}</p>
                                <p className="text-xs text-gray-500">{workout.desc}</p>
                            </div>
                            {isWorkoutActive && (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:bg-green-100 hover:border-green-500">
                                    <div className="w-3 h-3 rounded-full bg-transparent hover:bg-green-500"></div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-sm text-orange-800">
                ⚠️ <strong>Dica da Nutri:</strong> Respeite o descanso. Músculo cresce (e gordura queima) quando a gente dorme bem!
            </div>
        </div>
    );
  };

  const renderChat = () => (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-sm overflow-hidden relative">
        <div className="bg-pink-500 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
                    <span className="text-xl">👩‍⚕️</span>
                    <div className="absolute -bottom-1 -right-1 bg-green-400 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <h3 className="font-bold flex items-center gap-1">
                        Nutri Virtual 
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                    </h3>
                    <p className="text-xs opacity-80">Online & Julgando</p>
                </div>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap flex flex-col gap-2 ${
                        msg.sender === 'user' 
                        ? 'bg-purple-500 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                    }`}>
                        {msg.image && (
                            <img src={msg.image} alt="Foto enviada" className="rounded-lg w-full h-auto max-h-40 object-cover" />
                        )}
                        {msg.text}
                    </div>
                </div>
            ))}
            {loadingAI && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                        <span className="text-xs text-gray-500">Digitando...</span>
                    </div>
                </div>
            )}
        </div>

        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            {/* INPUT DE ARQUIVO OCULTO */}
            <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
            />
            
            <button 
                onClick={triggerCamera}
                className="bg-gray-100 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                title="Enviar Foto"
                disabled={loadingAI}
            >
                <Camera className="w-5 h-5" />
            </button>
            <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Fale com a nutri..."
                disabled={loadingAI}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
            />
            <button 
                onClick={handleChatSend}
                disabled={loadingAI}
                className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600 transition disabled:opacity-50"
            >
                {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
        </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6 pb-20">
        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-green-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Minhas Metas</h2>
            <p className="text-gray-500">Personalize os dados da Raylany aqui.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-purple-500"/> Peso Atual (kg)
                </label>
                <input 
                    type="number" 
                    value={editForm.weight}
                    onChange={(e) => setEditForm({...editForm, weight: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-purple-300 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500"/> Meta de Peso (kg)
                </label>
                <input 
                    type="number" 
                    value={editForm.goalWeight}
                    onChange={(e) => setEditForm({...editForm, goalWeight: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-lg font-bold text-green-600 focus:ring-2 focus:ring-green-300 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-blue-500"/> Altura (metros)
                </label>
                <input 
                    type="number" 
                    step="0.01"
                    value={editForm.height}
                    onChange={(e) => setEditForm({...editForm, height: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-blue-300 outline-none"
                />
            </div>

            <button 
                onClick={handleSaveGoals}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-200 hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
                <Save className="w-5 h-5" />
                Salvar Alterações
            </button>
        </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 font-sans text-gray-800 relative max-w-md mx-auto shadow-2xl overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 z-50"></div>

      <main className="pt-6 px-4 pb-24 h-full overflow-y-auto scrollbar-hide">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'treino' && renderWorkouts()}
        {activeTab === 'receitas' && renderRecipes()}
        {activeTab === 'nutri' && renderChat()}
        {activeTab === 'metas' && renderGoals()}
        {activeTab === 'music' && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
                <div className="bg-green-100 p-8 rounded-full animate-pulse">
                    <Music className="w-20 h-20 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-700">DJ Raylany (Spotify)</h2>
                <p className="text-gray-500 px-8">Mix Anos 2000 sem erro!</p>
                <button 
                    onClick={() => setShowPlayer(true)}
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition"
                >
                    Abrir Spotify
                </button>
                
                {/* WAKE LOCK BUTTON */}
                <button 
                    onClick={toggleScreenLock}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition mt-4 border-2 ${
                        isScreenLockActive 
                        ? 'bg-yellow-100 border-yellow-400 text-yellow-700' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                >
                    {isScreenLockActive ? <Lightbulb className="w-4 h-4" /> : <LightbulbOff className="w-4 h-4" />}
                    {isScreenLockActive ? "Modo Festa: Tela Ligada!" : "Manter Tela Ligada"}
                </button>
                <p className="text-xs text-gray-400 mt-2 max-w-xs">
                    💡 Ative isso para a música não parar quando você largar o celular.
                </p>
            </div>
        )}
      </main>

      {/* PLAYER SPOTIFY FLUTUANTE */}
      <div className={`absolute bottom-24 right-4 z-40 transition-all duration-300 ${showPlayer ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
          <div className={`${isMusicMini ? 'w-16 h-16 rounded-full' : 'w-80 h-80 rounded-2xl'} bg-black shadow-2xl overflow-hidden transition-all duration-300 relative border-2 border-green-500`}>
             <div className="absolute top-2 right-2 z-50 flex gap-2">
                 <button 
                    onClick={() => setIsMusicMini(!isMusicMini)}
                    className="bg-black/50 text-white p-1 rounded-full hover:bg-black/80"
                 >
                     {isMusicMini ? <Maximize2 size={12}/> : <Minimize2 size={12}/>}
                 </button>
                 {!isMusicMini && (
                    <button 
                        onClick={() => setShowPlayer(false)}
                        className="bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600"
                    >
                        <XCircle size={12} />
                    </button>
                 )}
             </div>

             {/* CAMADA DO BOTÃO MINI (Sempre renderizado, controlado por CSS) */}
             <button 
                onClick={() => setIsMusicMini(false)}
                className={`w-full h-full flex items-center justify-center bg-gray-900 absolute inset-0 z-10 transition-opacity duration-300 ${isMusicMini ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
             >
                 <div className="animate-spin-slow">
                    <Music className="text-green-500 w-8 h-8" />
                 </div>
             </button>

             {/* CAMADA DO IFRAME (Sempre renderizado, apenas fica invisível) */}
             <div className={`w-full h-full transition-opacity duration-300 ${isMusicMini ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <iframe 
                    style={{borderRadius: '12px'}} 
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DWUZ5bk6qqDSy?utm_source=generator&theme=0" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                ></iframe>
             </div>
          </div>
      </div>

      <nav className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center z-50 text-xs font-medium text-gray-400 max-w-md mx-auto shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'dashboard' ? 'text-pink-500 scale-110' : 'hover:text-pink-300'}`}
        >
            <User size={24} />
            <span>Perfil</span>
        </button>
        <button 
            onClick={() => setActiveTab('treino')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'treino' ? 'text-purple-500 scale-110' : 'hover:text-purple-300'}`}
        >
            <Dumbbell size={24} />
            <span>Treino</span>
        </button>
        
        <div className="relative -top-6">
            <button 
                onClick={() => setActiveTab('receitas')}
                className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-lg shadow-pink-200 hover:shadow-pink-400 transition transform hover:-translate-y-1"
            >
                <Utensils size={28} />
            </button>
        </div>

        <button 
            onClick={() => setActiveTab('nutri')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'nutri' ? 'text-blue-500 scale-110' : 'hover:text-blue-300'}`}
        >
            <MessageCircle size={24} />
            <span>Nutri</span>
        </button>
        <button 
            onClick={() => setActiveTab('music')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'music' ? 'text-green-500 scale-110' : 'hover:text-green-300'}`}
        >
            <Music size={24} />
            <span>Vibe</span>
        </button>
      </nav>

      {/* START WORKOUT OVERLAY */}
      {showStartAnimation && (
        <div className="fixed inset-0 z-[70] bg-black/80 flex flex-col items-center justify-center p-4 text-center">
            <div className="animate-bounce mb-4">
                <Flame className="w-24 h-24 text-orange-500" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2 italic uppercase">Modo Monstro Ativado!</h1>
            <p className="text-xl text-yellow-300 font-bold mb-8">
                "{MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)]}"
            </p>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <p className="text-white text-sm opacity-80">A Nutri tá de olho 👀</p>
            </div>
        </div>
      )}

      {/* MODAL RECEITA MAGICA */}
      {showRecipeModal && (
        <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
                        <ChefHat className="w-5 h-5" />
                        Receita Mágica
                    </h3>
                    <button onClick={() => setShowRecipeModal(false)} className="text-gray-400 hover:text-gray-600">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">O que tem na sua geladeira? Digite e eu crio uma receita fit!</p>
                <textarea 
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    placeholder="Ex: 2 ovos, meio tomate, cebola e farinha de aveia..."
                    className="w-full bg-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 h-24 resize-none"
                />
                <button 
                    onClick={handleGenerateRecipe}
                    disabled={!ingredientsInput.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition"
                >
                    <Sparkles className="w-4 h-4" />
                    Criar Receita
                </button>
            </div>
        </div>
      )}

      {/* MODAL LISTA DE COMPRAS */}
      {showShoppingList && (
        <div className="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-orange-600 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Lista da Ray
                    </h3>
                    <button onClick={() => setShowShoppingList(false)} className="text-gray-400 hover:text-gray-600">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>
                <ul className="space-y-3">
                    {shoppingItems.map((item, idx) => (
                        <li 
                            key={idx} 
                            onClick={() => handleToggleShoppingItem(idx)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                item.checked 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                            }`}
                        >
                            <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${
                                item.checked 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-orange-300 bg-white'
                            }`}>
                                {item.checked && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className={`text-gray-700 font-medium transition-all ${item.checked ? 'line-through opacity-50' : ''}`}>
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 bg-orange-50 p-3 rounded-xl text-xs text-orange-800 text-center">
                    Não esquece: Foco no hortifruti e foge do corredor de doces! 🚫🍫
                </div>
            </div>
        </div>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20" />
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform animate-bounce z-50">
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-purple-600">PARABÉNS RAY!</h2>
                <p className="text-gray-600">Mais um dia vencido!</p>
            </div>
        </div>
      )}

      {showEsporro && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-red-900/90 backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-3xl shadow-2xl text-center max-w-sm w-full border-4 border-red-500">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-red-600 mb-2">ESPORRO DA NUTRI</h2>
                <p className="text-gray-800 font-medium text-lg">"{esporroText}"</p>
                <button 
                    onClick={() => setShowEsporro(false)}
                    className="mt-6 bg-red-500 text-white w-full py-3 rounded-xl font-bold hover:bg-red-600"
                >
                    Prometo melhorar... 😔
                </button>
            </div>
        </div>
      )}

    </div>
  );
}
