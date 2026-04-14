import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Trash2,
  Eye,
  Calendar,
  Pill,
  Clock,
  Inbox,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./History.css";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/medicine/history?page=${page}&limit=10&search=${searchTerm}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { data, pagination } = response.data;
      setHistory(data || []);
      setTotalPages(pagination?.totalPages || 1);
      setTotalRecords(pagination?.totalRecords || 0);
    } catch (err) {
      console.error("Fetch History Error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchHistory();
    }, 400);
    return () => clearTimeout(handler);
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/v1/medicine/deletehistory/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setHistory((prev) => prev.filter((item) => item._id !== id));
      setTotalRecords((prev) => prev - 1);
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

  return (
    <div className="history-wrapper">
      <div className="history-container">
        <header className="history-header">
          <div className="header-content">
            <h1>Medical History</h1>
            <div className="stats-badge">
              <Pill size={14} />
              <span>
                Total: <strong>{totalRecords}</strong> Scans
              </span>
            </div>
          </div>
          <p className="header-subtitle">
            Manage and review your analyzed medications
          </p>
        </header>

        <div className="history-controls">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by medicine name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {loading && history.length === 0 ? (
          <div className="status-container">
            <Loader2 className="spinner" size={40} />
            <p>Loading your history...</p>
          </div>
        ) : (
          <div className="history-grid">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item._id} className="history-card">
                  <div className="card-top">
                    <div className="med-icon-wrapper">
                      <Pill size={24} />
                    </div>
                    <div className="med-details">
                      <h3>
                        {item.medicineName || item.query || "Medical Analysis"}
                      </h3>
                      <p className="salt-text">
                        {item.salt || item.composition || "General Salt"}
                      </p>
                    </div>
                  </div>

                  <div className="card-bottom">
                    <div className="med-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div className="action-buttons">
                      <button className="btn-view" title="View details">
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item._id)}
                        title="Delete record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-box">
                <Inbox size={60} />
                <h3>No medicines found</h3>
                <p>Try a different search or scan a new medicine.</p>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <footer className="pagination-footer">
            <button
              className="pg-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={20} /> Prev
            </button>
            <div className="page-indicator">
              Page <span>{page}</span> of {totalPages}
            </div>
            <button
              className="pg-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight size={20} />
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default History;
