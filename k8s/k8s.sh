#!/bin/bash

# create the namespace
kubectl apply -f k8s/namespace.yaml

# create the deployment
kubectl apply -f k8s/deployment.yaml

# create the service
kubectl apply -f k8s/service.yaml
