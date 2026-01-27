import React, { useState, useCallback, memo } from 'react';
import List from './List';
import AddEdit from './AddEdit';

const Crud = () => {
  const [view, setView] = useState('list');
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAdd = useCallback(() => {
    setEditingRecord(null);
    setView('form');
  }, []);

  const handleEdit = useCallback((record) => {
    setEditingRecord(record);
    setView('form');
  }, []);

  const handleCancel = useCallback(() => {
    setView('list');
    setEditingRecord(null);
  }, []);

  const handleSave = useCallback(() => {
    setView('list');
    setEditingRecord(null);
  }, []);

  return (
    <>
      {view === 'list' && (
        <List 
          onAdd={handleAdd} 
          onEdit={handleEdit} 
        />
      )}
      {view === 'form' && (
        <AddEdit 
          editingRecord={editingRecord}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default memo(Crud);
