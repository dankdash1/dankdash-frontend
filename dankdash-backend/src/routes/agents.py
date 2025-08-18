from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import json

agents_bp = Blueprint('agents', __name__)

# Mock agent data - in production this would connect to actual AI services
AGENT_TYPES = {
    'grow_master': {
        'name': 'Grow Master Monitor',
        'description': 'Monitors cultivation environment, automates irrigation, tracks plant health',
        'capabilities': ['environmental_monitoring', 'irrigation_control', 'harvest_prediction', 'pest_detection'],
        'status': 'active'
    },
    'marketing': {
        'name': 'Marketing Agent',
        'description': 'Automates content creation, SEO/SEM, social media posting',
        'capabilities': ['content_creation', 'seo_optimization', 'social_media', 'campaign_management'],
        'status': 'active'
    },
    'sales': {
        'name': 'Sales Agent',
        'description': 'Handles lead qualification, customer outreach, demo booking',
        'capabilities': ['lead_qualification', 'customer_outreach', 'demo_booking', 'follow_up'],
        'status': 'active'
    },
    'engineering': {
        'name': 'Engineering Agent',
        'description': 'Code generation, testing, deployment automation',
        'capabilities': ['code_generation', 'testing_qa', 'devops_deploy', 'bug_fixing'],
        'status': 'active'
    },
    'design': {
        'name': 'Design Agent',
        'description': 'UI/UX creation, brand asset generation',
        'capabilities': ['ui_ux_design', 'brand_assets', 'content_creation', 'visual_optimization'],
        'status': 'active'
    },
    'support': {
        'name': 'Support Agent',
        'description': 'Customer support, ticket triage, documentation',
        'capabilities': ['ticket_triage', 'chat_support', 'documentation', 'issue_resolution'],
        'status': 'active'
    },
    'analytics': {
        'name': 'Data Analysis Agent',
        'description': 'Processes metrics, generates business insights',
        'capabilities': ['data_processing', 'metric_analysis', 'report_generation', 'predictive_analytics'],
        'status': 'active'
    }
}

# Mock agent activity data
def generate_agent_activity():
    activities = []
    agent_types = list(AGENT_TYPES.keys())
    
    for i in range(20):
        activity = {
            'id': i + 1,
            'agent_type': agent_types[i % len(agent_types)],
            'action': f'Automated task {i + 1}',
            'status': 'completed' if i % 4 != 0 else 'running',
            'timestamp': (datetime.now() - timedelta(hours=i)).isoformat(),
            'details': f'Task details for activity {i + 1}'
        }
        activities.append(activity)
    
    return activities

@agents_bp.route('/agents', methods=['GET'])
def get_agents():
    """Get all available AI agents"""
    agents = []
    for agent_id, agent_data in AGENT_TYPES.items():
        agent = {
            'id': agent_id,
            **agent_data,
            'last_active': datetime.now().isoformat(),
            'tasks_completed': 150 + hash(agent_id) % 100,
            'efficiency_score': 85 + hash(agent_id) % 15
        }
        agents.append(agent)
    
    return jsonify({'agents': agents})

@agents_bp.route('/agents/<agent_id>', methods=['GET'])
def get_agent_details(agent_id):
    """Get detailed information about a specific agent"""
    if agent_id not in AGENT_TYPES:
        return jsonify({'error': 'Agent not found'}), 404
    
    agent_data = AGENT_TYPES[agent_id]
    
    # Generate mock performance data
    performance_data = {
        'tasks_completed_today': 25 + hash(agent_id) % 20,
        'success_rate': 92 + hash(agent_id) % 8,
        'average_response_time': 1.2 + (hash(agent_id) % 10) / 10,
        'uptime_percentage': 99.5 + (hash(agent_id) % 5) / 10
    }
    
    # Generate recent activities
    activities = [activity for activity in generate_agent_activity() 
                 if activity['agent_type'] == agent_id][:10]
    
    agent_details = {
        'id': agent_id,
        **agent_data,
        'performance': performance_data,
        'recent_activities': activities
    }
    
    return jsonify({'agent': agent_details})

@agents_bp.route('/agents/<agent_id>/start', methods=['POST'])
def start_agent(agent_id):
    """Start an AI agent"""
    if agent_id not in AGENT_TYPES:
        return jsonify({'error': 'Agent not found'}), 404
    
    # In production, this would actually start the agent service
    return jsonify({
        'message': f'{AGENT_TYPES[agent_id]["name"]} started successfully',
        'status': 'running'
    })

@agents_bp.route('/agents/<agent_id>/stop', methods=['POST'])
def stop_agent(agent_id):
    """Stop an AI agent"""
    if agent_id not in AGENT_TYPES:
        return jsonify({'error': 'Agent not found'}), 404
    
    # In production, this would actually stop the agent service
    return jsonify({
        'message': f'{AGENT_TYPES[agent_id]["name"]} stopped successfully',
        'status': 'stopped'
    })

@agents_bp.route('/agents/<agent_id>/configure', methods=['POST'])
def configure_agent(agent_id):
    """Configure agent settings"""
    if agent_id not in AGENT_TYPES:
        return jsonify({'error': 'Agent not found'}), 404
    
    data = request.get_json()
    
    # In production, this would update agent configuration
    return jsonify({
        'message': f'{AGENT_TYPES[agent_id]["name"]} configuration updated',
        'config': data
    })

@agents_bp.route('/agents/activity', methods=['GET'])
def get_agent_activity():
    """Get recent agent activity across all agents"""
    activities = generate_agent_activity()
    
    return jsonify({
        'activities': activities,
        'total_count': len(activities)
    })

@agents_bp.route('/grow-room/status', methods=['GET'])
def get_grow_room_status():
    """Get current grow room environmental status"""
    # Mock grow room data
    grow_rooms = [
        {
            'id': 'room_1',
            'name': 'Flowering Room A',
            'temperature': 72.5,
            'humidity': 55.2,
            'co2_level': 1200,
            'light_intensity': 85,
            'ph_level': 6.2,
            'ec_level': 1.8,
            'plants_count': 48,
            'growth_stage': 'flowering',
            'days_in_stage': 35,
            'estimated_harvest': '2024-09-15',
            'alerts': []
        },
        {
            'id': 'room_2',
            'name': 'Vegetative Room B',
            'temperature': 75.1,
            'humidity': 65.8,
            'co2_level': 800,
            'light_intensity': 70,
            'ph_level': 5.9,
            'ec_level': 1.2,
            'plants_count': 72,
            'growth_stage': 'vegetative',
            'days_in_stage': 21,
            'estimated_harvest': '2024-10-20',
            'alerts': [
                {'type': 'warning', 'message': 'Humidity slightly high', 'timestamp': datetime.now().isoformat()}
            ]
        }
    ]
    
    return jsonify({'grow_rooms': grow_rooms})

@agents_bp.route('/grow-room/<room_id>/controls', methods=['POST'])
def control_grow_room(room_id):
    """Control grow room environmental systems"""
    data = request.get_json()
    
    # Mock control response
    return jsonify({
        'message': f'Grow room {room_id} controls updated',
        'controls': data,
        'timestamp': datetime.now().isoformat()
    })

@agents_bp.route('/agents/metrics', methods=['GET'])
def get_agent_metrics():
    """Get overall agent performance metrics"""
    metrics = {
        'total_agents': len(AGENT_TYPES),
        'active_agents': len([a for a in AGENT_TYPES.values() if a['status'] == 'active']),
        'total_tasks_today': 847,
        'success_rate': 94.2,
        'cost_savings': 12500.00,
        'productivity_increase': 340,
        'agent_utilization': {
            'grow_master': 78,
            'marketing': 92,
            'sales': 85,
            'engineering': 67,
            'design': 73,
            'support': 89,
            'analytics': 95
        }
    }
    
    return jsonify({'metrics': metrics})

