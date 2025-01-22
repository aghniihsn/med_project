import pytest
from unittest.mock import patch, MagicMock  

from app import create_app

@pytest.fixture  
def app():
    flask_app = create_app()
    flask_app.config['TESTING'] = True  
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://:memory:"
    return flask_app


@pytest.fixture  
def client(app):  
    return app.test_client()
  
@pytest.fixture  
def mock_requests_post():  
    with patch('requests.post') as mock_post:  
        yield mock_post  
  
@pytest.fixture  
def mock_requests_get():  
    with patch('requests.get') as mock_get:  
        yield mock_get  