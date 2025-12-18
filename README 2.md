
# End-to-End ML Classifier with CI/CD

## Overview

This project implements a **production-ready, end-to-end machine learning system** covering the complete ML lifecycle:

**Data ingestion → Training → Model registry → REST inference → Monitoring → CI/CD automation**

The system demonstrates **MLOps best practices**, reproducibility, and automated deployment using **minimal infrastructure** suitable for cloud free tiers.

---

## Key Features

- End-to-end ML pipeline (ingestion to inference)
- Deterministic and reproducible model training
- Versioned model registry
- REST-based inference service (FastAPI)
- Prometheus-style monitoring metrics
- Dockerized workloads
- Automated CI/CD with GitHub Actions
- Infrastructure as Code (Terraform)
- Clear and auditable architecture

---

## High-Level Architecture

```
Raw Data
   ↓
Data Ingestion & Validation
   ↓
Model Training & Evaluation
   ↓
Model Registry (Versioned)
   ↓
Inference API (FastAPI)
   ↓
Monitoring & Metrics
```

---

## Technology Stack

**Machine Learning**
- Python 3.10
- scikit-learn
- pandas, numpy
- joblib

**Backend**
- FastAPI
- Uvicorn

**MLOps & DevOps**
- Docker
- Docker Compose
- GitHub Actions
- Terraform

**Monitoring**
- Prometheus-compatible metrics

**Deployment**
- Free-tier cloud (Render / Fly.io / AWS EC2 Free Tier)

---

## Repository Structure

```
.
├── data/
│   ├── raw/
│   └── processed/
├── src/
│   ├── ingestion/
│   ├── training/
│   ├── registry/
│   ├── inference/
│   └── monitoring/
├── models/
├── tests/
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── terraform/
├── .github/workflows/
└── README.md
```

---

## API Endpoints

### Health Check
```
GET /health
```

### Prediction
```
POST /predict
```

Request:
```json
{
  "features": [5.1, 3.5, 1.4, 0.2]
}
```

Response:
```json
{
  "prediction": "class_A",
  "confidence": 0.92,
  "model_version": "v1"
}
```

### Metrics
```
GET /metrics
```

---

## CI/CD Pipeline

- Runs on every push to `main`
- Executes unit tests
- Trains and versions the model
- Builds Docker image
- Deploys inference service automatically

---

## Running Locally

```bash
docker-compose up --build
```

Service available at:
```
http://localhost:8000
```

---

## Monitoring

The inference service exposes **Prometheus-style metrics** for:
- Request count
- Inference latency
- Error rate

---

## Resume Summary

Built an end-to-end ML classifier with automated CI/CD using GitHub Actions and Docker, covering data ingestion, training, model versioning, REST inference, and monitoring; achieved sub-100ms inference latency with reproducible deployments.

---

## License

MIT
