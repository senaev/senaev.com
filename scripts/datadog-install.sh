#!/bin/bash
# One-time Datadog Agent 7 install on the server (with APM instrumentation for Docker).
# Run automatically by docker-deploy.sh if the script is not yet present on the server.
# https://app.datadoghq.eu/signup/setup/agent/docker

set -e
export DD_APM_INSTRUMENTATION_LIBRARIES=java:1,python:4,js:5,php:1,dotnet:3,ruby:2
export DD_APM_INSTRUMENTATION_ENABLED=docker
export DD_NO_AGENT_INSTALL=true
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
