import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const TIME_RANGES = [
  { value: 1, label: '1 Day' },
  { value: 7, label: '7 Days' },
  { value: 14, label: '14 Days' },
  { value: 30, label: '30 Days' }
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const MarketSentimentAnalyzerUI: React.FC = () => {
  // Mock data for UI demonstration
  const selectedStock = 'AAPL';
  const timeRange = 7;
  const loading = false;
  const error = null;
  const searchTerm = '';
  const showSearchResults = false;
  const searchResults = [
    { description: 'Apple Inc', displaySymbol: 'AAPL', symbol: 'AAPL', type: 'Common Stock' },
    { description: 'Tesla Inc', displaySymbol: 'TSLA', symbol: 'TSLA', type: 'Common Stock' },
    { description: 'Microsoft Corporation', displaySymbol: 'MSFT', symbol: 'MSFT', type: 'Common Stock' },
  ];
  
  const stockQuote = {
    c: 175.32,
    h: 176.85,
    l: 174.12,
    o: 175.50,
    pc: 174.75,
    t: Date.now() / 1000
  };
  
  const companyProfile = {
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '1980-12-12',
    marketCapitalization: 2000000000000,
    name: 'Apple Inc',
    phone: '1-408-996-1010',
    shareOutstanding: 16000000000,
    ticker: 'AAPL',
    weburl: 'https://www.apple.com',
    logo: 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png',
    finnhubIndustry: 'Technology'
  };
  
  const companiesWithBetterSentiment = [
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      sentiment: 0.45,
      industry: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc',
      sentiment: 0.38,
      industry: 'Technology'
    },
    {
      symbol: 'ORCL',
      name: 'Oracle Corporation',
      sentiment: 0.32,
      industry: 'Technology'
    }
  ];
  
  const sentimentData = [
    { date: 'May 1', avgSentiment: 0.2, stockPrice: 172.50, volume: 12 },
    { date: 'May 2', avgSentiment: 0.35, stockPrice: 173.25, volume: 8 },
    { date: 'May 3', avgSentiment: -0.1, stockPrice: 171.80, volume: 15 },
    { date: 'May 4', avgSentiment: 0.15, stockPrice: 173.00, volume: 10 },
    { date: 'May 5', avgSentiment: 0.4, stockPrice: 174.50, volume: 7 },
    { date: 'May 6', avgSentiment: 0.25, stockPrice: 175.20, volume: 9 },
    { date: 'May 7', avgSentiment: 0.3, stockPrice: 175.32, volume: 11 }
  ];
  
  const pieData = [
    { name: 'Positive', value: 18 },
    { name: 'Neutral', value: 12 },
    { name: 'Negative', value: 5 }
  ];
  
  const newsData = [
    {
      headline: 'Apple announces new AI features at WWDC 2023',
      url: '#',
      sentiment: { label: 'POSITIVE', score: 0.92 }
    },
    {
      headline: 'Apple faces regulatory challenges in Europe',
      url: '#',
      sentiment: { label: 'NEGATIVE', score: 0.85 }
    },
    {
      headline: 'Apple reports Q2 earnings above expectations',
      url: '#',
      sentiment: { label: 'POSITIVE', score: 0.88 }
    },
    {
      headline: 'New iPhone models expected in September',
      url: '#',
      sentiment: { label: 'NEUTRAL', score: 0.65 }
    },
    {
      headline: 'Apple expands its retail presence in Asia',
      url: '#',
      sentiment: { label: 'POSITIVE', score: 0.78 }
    }
  ];
  
  const stats = {
    avgSentiment: 0.25,
    totalPosts: 35,
    sentimentDist: { positive: 18, negative: 5, neutral: 12 }
  };

  const sentimentColor = (label: string) => {
    if (label === 'POSITIVE') return '#10B981';
    if (label === 'NEGATIVE') return '#EF4444';
    return '#F59E0B';
  };

  const sentimentColorValue = (value: number) => {
    if (value > 0.2) return COLORS[0];
    if (value < -0.2) return COLORS[2];
    return COLORS[1];
  };

  // Empty handlers for UI demonstration
  const handleSearchInputChange = () => {};
  const handleSelectCompany = () => {};
  const handleSelectBetterCompany = () => {};

  return (
    <div className="market-sentiment-app">
      <header className="app-header">
        <h1 className="app-title">📊 Market Sentiment Analyzer</h1>
      </header>

      {/* Company Search */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for a company..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((company) => (
                <div 
                  key={company.symbol} 
                  className="search-result-item"
                  onClick={() => handleSelectCompany(company.symbol)}
                >
                  <span className="company-symbol">{company.symbol}</span>
                  <span className="company-name">{company.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="controls-container">
        <div className="controls">
          {selectedStock && (
            <div className="selected-stock">
              Selected: <strong>{selectedStock}</strong>
              {companyProfile && (
                <span className="company-industry"> ({companyProfile.finnhubIndustry})</span>
              )}
            </div>
          )}

          <select
            value={timeRange}
            onChange={() => {}}
            className="time-select"
          >
            {TIME_RANGES.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          <button
            onClick={() => {}}
            disabled={loading}
            className="refresh-button"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </div>

      {stockQuote && (
        <div className="stock-quote">
          <h2>{companyProfile?.name || selectedStock} Stock Price: ${stockQuote.c.toFixed(2)}</h2>
          <div className="quote-details">
            <span>Open: ${stockQuote.o.toFixed(2)}</span>
            <span>High: ${stockQuote.h.toFixed(2)}</span>
            <span>Low: ${stockQuote.l.toFixed(2)}</span>
            <span>Prev Close: ${stockQuote.pc.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Companies with Better Sentiment Section */}
      {companiesWithBetterSentiment.length > 0 && (
        <div className="better-sentiment-container">
          <h3>Companies in Same Industry with Better Sentiment</h3>
          <div className="better-sentiment-companies">
            {companiesWithBetterSentiment.map((company) => (
              <div 
                key={company.symbol} 
                className="better-sentiment-company"
                onClick={() => handleSelectBetterCompany(company.symbol)}
              >
                <div className="company-name">{company.name} ({company.symbol})</div>
                <div className="company-industry">{company.industry}</div>
                <div 
                  className="company-sentiment"
                  style={{ color: sentimentColorValue(company.sentiment) }}
                >
                  Sentiment: {company.sentiment.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sentiment-overview">
        <div className="sentiment-pie">
          <h3>Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} articles`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="sentiment-score">
          <h3>Average Sentiment Score</h3>
          <div
            className="score-display"
            style={{
              color:
                stats.avgSentiment > 0.2 ? COLORS[0] :
                stats.avgSentiment < -0.2 ? COLORS[2] :
                COLORS[1]
            }}
          >
            {stats.avgSentiment.toFixed(2)}
          </div>
          <div className="score-description">
            {stats.avgSentiment > 0.2 ? 'Strong Positive' :
             stats.avgSentiment > 0 ? 'Mildly Positive' :
             stats.avgSentiment < -0.2 ? 'Strong Negative' :
             stats.avgSentiment < 0 ? 'Mildly Negative' : 'Neutral'} Sentiment
          </div>
          <div className="total-articles">
            Analyzed {stats.totalPosts} articles
          </div>
        </div>
      </div>

      {sentimentData.length > 0 && (
        <div className="line-chart-container">
          <h3>Sentiment & Stock Price Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={sentimentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis yAxisId="left" domain={[-1, 1]} tickFormatter={(v) => v.toFixed(1)} stroke="#10B981" />
              <YAxis yAxisId="right" orientation="right" domain={['dataMin - 5', 'dataMax + 5']} stroke="#3B82F6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value, name) => {
                  if (name === 'Stock Price ($)') return [`$${value}`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avgSentiment"
                stroke="#10B981"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Avg Sentiment"
                dot={{ r: 3 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="stockPrice"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Stock Price ($)"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="news-container">
        <h3>Latest News Headlines</h3>
        <div className="news-list">
          {newsData.map((news, idx) => (
            <div key={idx} className="news-item">
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-headline"
                title={news.headline}
              >
                {news.headline}
              </a>
              {news.sentiment && (
                <span
                  className="sentiment-badge"
                  style={{
                    backgroundColor: sentimentColor(news.sentiment.label)
                  }}
                >
                  {news.sentiment.label}
                  <span className="sentiment-score-badge">
                    {news.sentiment.score.toFixed(2)}
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .market-sentiment-app {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
        }

        .app-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .app-title {
          font-size: 2.2rem;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .search-container {
          display: flex;
          margin-bottom: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
        }

        .search-input {
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: 100%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-top: none;
          border-radius: 0 0 6px 6px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 10;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .search-result-item {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s;
        }

        .search-result-item:hover {
          background-color: #f8fafc;
        }

        .company-symbol {
          font-weight: bold;
          color: #3b82f6;
        }

        .company-name {
          color: #4b5563;
        }

        .company-industry {
          color: #6b7280;
          font-style: italic;
          font-size: 0.9em;
        }

        .better-sentiment-container {
          background-color: #f0f9ff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .better-sentiment-container h3 {
          text-align: center;
          margin-bottom: 16px;
          color: #0369a1;
        }

        .better-sentiment-companies {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .better-sentiment-company {
          background-color: white;
          padding: 16px;
          border-radius: 6px;
          min-width: 200px;
          flex: 1;
          max-width: 250px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .better-sentiment-company:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .better-sentiment-company .company-name {
          font-weight: 600;
          margin-bottom: 8px;
          color: #1e293b;
        }

        .better-sentiment-company .company-industry {
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .better-sentiment-company .company-sentiment {
          font-size: 1.1rem;
          font-weight: bold;
        }

        .selected-stock {
          padding: 10px 16px;
          background-color: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          color: #1e293b;
        }

        .controls-container {
          margin-bottom: 24px;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .time-select {
          padding: 10px 16px;
          font-size: 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background-color: white;
          color: #374151;
          min-width: 180px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-select:hover {
          border-color: #9ca3af;
        }

        .time-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .refresh-button {
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 500;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .refresh-button:hover {
          background-color: #2563eb;
        }

        .refresh-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .error-message {
          color: #dc2626;
          background-color: #fee2e2;
          padding: 12px;
          border-radius: 6px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .stock-quote {
          text-align: center;
          margin-bottom: 32px;
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stock-quote h2 {
          font-size: 1.8rem;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .quote-details {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .quote-details span {
          font-size: 1rem;
          color: #64748b;
        }

        .sentiment-overview {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .sentiment-pie {
          flex: 1;
          min-width: 300px;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .sentiment-pie h3 {
          text-align: center;
          margin-bottom: 16px;
          color: #1e293b;
        }

        .sentiment-score {
          flex: 1;
          min-width: 300px;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .sentiment-score h3 {
          margin-bottom: 16px;
          color: #1e293b;
        }

        .score-display {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .score-description {
          font-size: 1.2rem;
          color: #64748b;
          margin-bottom: 12px;
        }

        .total-articles {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        .line-chart-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 32px;
        }

        .line-chart-container h3 {
          text-align: center;
          margin-bottom: 16px;
          color: #1e293b;
        }

        .news-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .news-container h3 {
          margin-bottom: 16px;
          color: #1e293b;
        }

        .news-list {
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
        }

        .news-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e2e8f0;
          transition: background-color 0.2s;
        }

        .news-item:hover {
          background-color: #f8fafc;
        }

        .news-headline {
          flex: 1;
          margin-right: 16px;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .news-headline:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        .sentiment-badge {
          padding: 6px 12px;
          border-radius: 16px;
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 80px;
          justify-content: center;
        }

        .sentiment-score-badge {
          background-color: rgba(255,255,255,0.2);
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 0.7rem;
        }

        @media (max-width: 768px) {
          .sentiment-overview {
            flex-direction: column;
          }
          
          .controls {
            flex-direction: column;
            align-items: center;
          }
          
          .time-select, .refresh-button {
            width: 100%;
            max-width: 300px;
          }
          
          .better-sentiment-company {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketSentimentAnalyzerUI;






















