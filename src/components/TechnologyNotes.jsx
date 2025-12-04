// ПРАКТИКА 21: Компонент для заметок к технологии
// Компонент с textarea для заметок и отображением статуса сохранения

import { useState, useEffect } from 'react';
import './TechnologyNotes.css';

function TechnologyNotes({ technology, onNotesChange }) {
  // НОВОВВЕДЕНИЕ: Локальное состояние для текста заметки
  const [notes, setNotes] = useState(technology?.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  // НОВОВВЕДЕНИЕ: Синхронизация с переданной технологией
  useEffect(() => {
    if (technology?.notes !== undefined) {
      setNotes(technology.notes || '');
    }
  }, [technology?.id, technology?.notes]);

  // НОВОВВЕДЕНИЕ: Обработчик изменения заметки
  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    setIsSaved(false);

    // НОВОВВЕДЕНИЕ: Вызов функции обновления заметок
    if (onNotesChange) {
      onNotesChange(technology.id, newNotes);
    }
  };

  // НОВОВВЕДЕНИЕ: Эффект для показа сообщения "Заметка сохранена"
  useEffect(() => {
    if (notes && notes.length > 0) {
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [notes]);

  const characterCount = notes.length;

  return (
    <div className="technology-notes">
      <label htmlFor={`notes-${technology?.id}`} className="notes-label">
        Заметки к технологии
      </label>
      
      <textarea
        id={`notes-${technology?.id}`}
        className="notes-textarea"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Добавьте заметки о технологии..."
        rows={4}
      />

      <div className="notes-footer">
        {isSaved && notes.length > 0 ? (
          <span className="notes-saved">
            ✅ Заметка сохранена ({characterCount} символов)
          </span>
        ) : notes.length === 0 ? (
          <span className="notes-empty">
            💡 Добавьте заметку
          </span>
        ) : (
          <span className="notes-count">
            {characterCount} символов
          </span>
        )}
      </div>
    </div>
  );
}

export default TechnologyNotes;

