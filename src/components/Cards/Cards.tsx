import React, { useEffect, useState } from "react";
import "./Cards.css";
import { fetchData } from "../../core/services/json.service"; 

const Cards: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]); 

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const fetchedCards = await fetchData();
      setCards(fetchedCards); 
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <div className="details">
      <h2 className="title-primary">Agenda personal simplificada</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div>
              <img src={card.urlImg} alt={card.title} />
              <h3 className="title">{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
