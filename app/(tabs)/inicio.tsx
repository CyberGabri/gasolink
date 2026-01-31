import React, { useState, useEffect } from "react";

// Ícones SVG Simples para substituir o lucide-react (Zero dependências)
const IconMapPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const IconTrendingUp = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
const IconZap = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6366f1"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const HomeContent = () => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const frasesIA = [
    "SISTEMA: Monitoramento indica alta do Brent. Repasse provável em Fortaleza em 48h.",
    "POLÍTICA: Governo Federal discute nova diretriz para preços de combustíveis.",
    "AVISO: Fluxo intenso na Washington Soares sentido Centro. Tempo +15min.",
    "OPORTUNIDADE: Posto Ipiranga (Chesf) mantém valor abaixo da média da Aldeota.",
  ];

  useEffect(() => {
    const currentFullText = frasesIA[phraseIndex];
    const speed = isDeleting ? 15 : 40;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % frasesIA.length);
      } else {
        const nextText = isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <div style={styles.page}>
      {/* TICKER DE MERCADO (TOP) */}
      <div style={styles.topTicker}>
        <div style={styles.tickerTrack}>
          <span style={styles.tickerItem}>
            <b>USD/BRL:</b> 5.12 <IconTrendingUp />
          </span>
          <span style={styles.tickerItem}>
            <b>BRENT OIL:</b> $82.45 <IconTrendingUp />
          </span>
          <span style={styles.tickerItem}>
            <b>GOVERNO:</b> Presidente assina decreto de infraestrutura no
            Ceará...
          </span>
        </div>
      </div>

      <div style={styles.wrapper}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.mainTitle}>Painel Dalva</h1>
            <div style={styles.locationContainer}>
              <IconMapPin />
              <span>Fortaleza, Ceará</span>
            </div>
          </div>
          <div style={styles.systemStatus}>SISTEMA ATIVO</div>
        </header>

        {/* TERMINAL DE IA */}
        <div style={styles.aiTerminal}>
          <div style={styles.terminalHeader}>
            <IconZap />
            <span>ASSISTENTE ANALÍTICO</span>
          </div>
          <p style={styles.terminalText}>
            {displayText}
            <span style={styles.cursor}>_</span>
          </p>
        </div>

        {/* MAPA OPERACIONAL */}
        <div style={styles.mapSection}>
          <iframe
            title="operational-map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-38.56,-3.76,-38.48,-3.70&layer=mapnik"
            style={styles.iframe}
          />
          <div
            style={
              {
                ...styles.mapOverlay,
                top: "40%",
                left: "50%",
              } as React.CSSProperties
            }
          >
            Chesf: R$ 5.75
          </div>
        </div>

        {/* FEED DE POSTOS */}
        <h3 style={styles.subHeading}>Relatório de Unidades - Fortaleza</h3>
        <div style={styles.feedContainer}>
          {[
            {
              id: 1,
              nome: "Posto Ipiranga (Chesf)",
              rua: "Av. Oliveira Paiva",
              valor: "5.75",
              ref: "D1",
              cor: "#10B981",
            },
            {
              id: 2,
              nome: "Shell Dragão do Mar",
              rua: "Praia de Iracema",
              valor: "5.92",
              ref: "D2",
              cor: "#3b82f6",
            },
            {
              id: 3,
              nome: "Posto SP (Aguanambi)",
              rua: "Av. Aguanambi",
              valor: "5.88",
              ref: "D3",
              cor: "#6366f1",
            },
            {
              id: 4,
              nome: "Petrobras",
              rua: "Av. Washington Soares",
              valor: "5.99",
              ref: "D4",
              cor: "#94a3b8",
            },
          ].map((item) => (
            <div key={item.id} style={styles.itemCard}>
              <div style={styles.itemLeft}>
                <div style={styles.idBadge}>{item.ref}</div>
                <div>
                  <div style={styles.itemName}>{item.nome}</div>
                  <div style={styles.itemSub}>{item.rua}</div>
                </div>
              </div>
              <div style={{ ...styles.itemPrice, color: item.cor }}>
                R$ {item.valor}
              </div>
            </div>
          ))}
          <div style={styles.loadMore}>Sincronizando dados adicionais...</div>
        </div>
      </div>

      <style>{`
        @keyframes scrollTicker { 0% { transform: translateX(100%); } 100% { transform: translateX(-150%); } }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    fontFamily: "sans-serif",
    color: "#1e293b",
  },
  topTicker: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    padding: "8px 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  tickerTrack: {
    display: "inline-block",
    animation: "scrollTicker 30s linear infinite",
    fontSize: "11px",
    color: "#64748b",
  },
  tickerItem: {
    marginRight: "40px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
  },
  wrapper: { padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  mainTitle: { fontSize: "24px", fontWeight: "800", margin: 0 },
  locationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#94a3b8",
  },
  systemStatus: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#10b981",
    backgroundColor: "#f0fdf4",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  aiTerminal: {
    backgroundColor: "#0f172a",
    borderRadius: "12px",
    padding: "15px",
    color: "#f8fafc",
    marginBottom: "20px",
  },
  terminalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    color: "#94a3b8",
    marginBottom: "10px",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "5px",
  },
  terminalText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.5",
    fontFamily: "monospace",
  },
  cursor: { color: "#6366f1", animation: "pulse 1s infinite" },
  mapSection: {
    height: "180px",
    borderRadius: "15px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "20px",
    border: "1px solid #e2e8f0",
  },
  iframe: { width: "100%", height: "100%", border: 0 },
  mapOverlay: {
    position: "absolute",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  subHeading: { fontSize: "16px", fontWeight: "700", marginBottom: "12px" },
  feedContainer: { display: "flex", flexDirection: "column", gap: "10px" },
  itemCard: {
    padding: "14px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: { display: "flex", alignItems: "center", gap: "12px" },
  idBadge: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: "bold",
    color: "#64748b",
  },
  itemName: { fontSize: "13px", fontWeight: "700" },
  itemSub: { fontSize: "11px", color: "#94a3b8" },
  itemPrice: { fontSize: "16px", fontWeight: "900" },
  loadMore: {
    textAlign: "center",
    padding: "15px",
    fontSize: "11px",
    color: "#94a3b8",
  },
};

export default HomeContent;
