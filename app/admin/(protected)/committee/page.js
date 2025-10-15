'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialCommittees = {
  'Advisory Committee': [
    { id: 1, name: 'Dr. Advisor', position: 'Chief Advisor', photo: '/images/placeholder.jpg' },
  ],
  'Executive Committee': [
    { id: 2, name: 'John Doe', position: 'President', photo: '/images/placeholder.jpg' },
    { id: 3, name: 'Jane Smith', position: 'Vice President', photo: '/images/placeholder.jpg' },
  ],
  'Trustee Board': [
    { id: 4, name: 'Mr. Trustee', position: 'Chairman', photo: '/images/placeholder.jpg' },
  ],
};

const COMMITTEE_TYPES = ['Advisory Committee', 'Executive Committee', 'Trustee Board'];

export default function Committee() {
  const [committees, setCommittees] = useState(initialCommittees);
  const [selectedCommittee, setSelectedCommittee] = useState(COMMITTEE_TYPES[0]);
  const [newMember, setNewMember] = useState({ name: '', position: '', photo: '', committee: COMMITTEE_TYPES[0] });
  const [editingMember, setEditingMember] = useState(null); // The original member object
  const [editFormState, setEditFormState] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };
  
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormState({ ...editFormState, [name]: value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const { committee, ...memberData } = newMember;
    setCommittees(prev => ({
      ...prev,
      [committee]: [...(prev[committee] || []), { ...memberData, id: Date.now() }],
    }));
    setNewMember({ name: '', position: '', photo: '', committee: selectedCommittee });
  };

  const handleDeleteMember = (id) => {
    setCommittees(prev => ({
      ...prev,
      [selectedCommittee]: prev[selectedCommittee].filter(member => member.id !== id),
    }));
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setEditFormState({ ...member, committee: selectedCommittee });
  };

  const handleUpdateMember = (e) => {
    e.preventDefault();
    if (!editingMember) return;

    const { committee: newCommittee, ...updatedMemberData } = editFormState;

    setCommittees(prev => {
      const newCommitteesState = { ...prev };
      
      let originalCommitteeKey = null;
      for (const key of Object.keys(newCommitteesState)) {
          if (newCommitteesState[key].some(m => m.id === editingMember.id)) {
              originalCommitteeKey = key;
              break;
          }
      }

      if (originalCommitteeKey) {
          newCommitteesState[originalCommitteeKey] = newCommitteesState[originalCommitteeKey].filter(m => m.id !== editingMember.id);
      }

      newCommitteesState[newCommittee] = [
        ...(newCommitteesState[newCommittee] || []),
        { ...updatedMemberData, id: editingMember.id }
      ];

      return newCommitteesState;
    });

    setEditingMember(null);
    setEditFormState(null);
  };
  
  const handleCancelEdit = () => {
    setEditingMember(null);
    setEditFormState(null);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Committee Members</h1>
      
      <div className={styles.formGroup}>
        <label htmlFor="committee-select">Select Committee:</label>
        <select
          id="committee-select"
          value={selectedCommittee}
          onChange={(e) => setSelectedCommittee(e.target.value)}
          className={styles.select}
        >
          {COMMITTEE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className={styles.addMemberForm}>
        <h2>Add New Member</h2>
        <form onSubmit={handleAddMember}>
          <div className={styles.formGroup}>
            <label htmlFor="committee">Committee</label>
            <select id="committee" name="committee" value={newMember.committee} onChange={handleInputChange} className={styles.select}>
              {COMMITTEE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={newMember.name} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>
            <input type="text" id="position" name="position" value={newMember.position} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="photo">Photo URL</label>
            <input type="text" id="photo" name="photo" value={newMember.photo} onChange={handleInputChange} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Member</button>
        </form>
      </div>

      <div className={styles.memberList}>
        <h2>Existing Members for {selectedCommittee}</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(committees[selectedCommittee] || []).map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditClick(member)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteMember(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Member</h2>
            <form onSubmit={handleUpdateMember}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-committee">Committee</label>
                <select id="edit-committee" name="committee" value={editFormState.committee} onChange={handleEditFormChange} className={styles.select}>
                  {COMMITTEE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-name">Name</label>
                <input type="text" id="edit-name" name="name" value={editFormState.name} onChange={handleEditFormChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-position">Position</label>
                <input type="text" id="edit-position" name="position" value={editFormState.position} onChange={handleEditFormChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-photo">Photo URL</label>
                <input type="text" id="edit-photo" name="photo" value={editFormState.photo} onChange={handleEditFormChange} />
              </div>
              <button type="submit" className={styles.submitButton}>Update Member</button>
              <button type="button" className={styles.cancelButton} onClick={handleCancelEdit}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
