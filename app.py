"""
Professional Sign Board & Poster Designing Website
Production-Ready Commercial Design Tool
Backend: Flask with Canvas-based Design Rendering
"""

from flask import Flask, render_template, jsonify, request
import json
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'signboard_design_secret_2026'

# Business-specific design configurations
BUSINESS_DESIGNS = {
    'Restaurant': {
        'icon': '🍽️',
        'colors': {
            'primary': '#C41E3A',      # Bold red
            'secondary': '#FF6B35',    # Warm orange
            'accent': '#FFC300',       # Gold
            'text': '#FFFFFF',
            'dark': '#2C1810'
        },
        'fonts': {
            'primary': 'Bebas Neue',
            'secondary': 'Poppins'
        },
        'tagline': 'Taste the Difference',
        'pattern': 'diagonal_stripes'
    },
    'Cafe': {
        'icon': '☕',
        'colors': {
            'primary': '#6F4E37',      # Coffee brown
            'secondary': '#A0826D',    # Warm tan
            'accent': '#FFD700',       # Gold
            'text': '#FFFFFF',
            'dark': '#3E2723'
        },
        'fonts': {
            'primary': 'Montserrat',
            'secondary': 'Poppins'
        },
        'tagline': 'Brew Your Day',
        'pattern': 'cafe_dots'
    },
    'Salon': {
        'icon': '💇',
        'colors': {
            'primary': '#8B4789',      # Deep purple
            'secondary': '#E91E63',    # Pink
            'accent': '#FF69B4',       # Hot pink
            'text': '#FFFFFF',
            'dark': '#3E1F47'
        },
        'fonts': {
            'primary': 'Montserrat',
            'secondary': 'Poppins'
        },
        'tagline': 'Beauty Redefined',
        'pattern': 'gradient'
    },
    'Barber Shop': {
        'icon': '✂️',
        'colors': {
            'primary': '#1A1A1A',      # Black
            'secondary': '#DC143C',    # Crimson red
            'accent': '#FFD700',       # Gold
            'text': '#FFFFFF',
            'dark': '#000000'
        },
        'fonts': {
            'primary': 'Bebas Neue',
            'secondary': 'Poppins'
        },
        'tagline': 'Gentleman\'s Choice',
        'pattern': 'diagonal_stripes'
    },
    'Grocery': {
        'icon': '🛒',
        'colors': {
            'primary': '#2ECC71',      # Fresh green
            'secondary': '#F1C40F',    # Bright yellow
            'accent': '#E74C3C',       # Red accent
            'text': '#FFFFFF',
            'dark': '#1E5631'
        },
        'fonts': {
            'primary': 'Poppins',
            'secondary': 'Poppins'
        },
        'tagline': 'Fresh & Affordable',
        'pattern': 'dots'
    },
    'Electronics': {
        'icon': '📱',
        'colors': {
            'primary': '#001F3F',      # Navy
            'secondary': '#0074D9',    # Blue
            'accent': '#39CCCC',       # Cyan
            'text': '#FFFFFF',
            'dark': '#000814'
        },
        'fonts': {
            'primary': 'Bebas Neue',
            'secondary': 'Montserrat'
        },
        'tagline': 'Latest Technology',
        'pattern': 'circuit'
    },
    'Clothing': {
        'icon': '👔',
        'colors': {
            'primary': '#2C2C2C',      # Dark grey
            'secondary': '#B8860B',    # Gold
            'accent': '#DAA520',       # Dark gold
            'text': '#FFFFFF',
            'dark': '#1A1A1A'
        },
        'fonts': {
            'primary': 'Montserrat',
            'secondary': 'Poppins'
        },
        'tagline': 'Fashion Forward',
        'pattern': 'diamond'
    },
    'Pharmacy': {
        'icon': '💊',
        'colors': {
            'primary': '#27AE60',      # Medical green
            'secondary': '#FFFFFF',
            'accent': '#E74C3C',       # Red
            'text': '#FFFFFF',
            'dark': '#1E5631'
        },
        'fonts': {
            'primary': 'Bebas Neue',
            'secondary': 'Poppins'
        },
        'tagline': 'Your Health, Our Care',
        'pattern': 'gradient'
    },
    'Bakery': {
        'icon': '🍰',
        'colors': {
            'primary': '#D2691E',      # Chocolate
            'secondary': '#FFB6C1',    # Light pink
            'accent': '#FFA500',       # Orange
            'text': '#FFFFFF',
            'dark': '#654321'
        },
        'fonts': {
            'primary': 'Poppins',
            'secondary': 'Poppins'
        },
        'tagline': 'Freshly Baked Daily',
        'pattern': 'dots'
    },
    'Gym': {
        'icon': '💪',
        'colors': {
            'primary': '#1A1A1A',      # Black
            'secondary': '#FF0000',    # Bright red
            'accent': '#FFFF00',       # Yellow
            'text': '#FFFFFF',
            'dark': '#000000'
        },
        'fonts': {
            'primary': 'Bebas Neue',
            'secondary': 'Montserrat'
        },
        'tagline': 'Transform Your Body',
        'pattern': 'diagonal_stripes'
    },
    'Jewelry': {
        'icon': '💎',
        'colors': {
            'primary': '000000',       # Black
            'secondary': '#FFD700',    # Gold
            'accent': '#E8E8E8',       # Silver
            'text': '#FFFFFF',
            'dark': '#1A1A1A'
        },
        'fonts': {
            'primary': 'Montserrat',
            'secondary': 'Poppins'
        },
        'tagline': 'Elegance & Luxury',
        'pattern': 'gradient'
    },
    'Hotel': {
        'icon': '🏨',
        'colors': {
            'primary': '#1C1C1C',      # Dark
            'secondary': '#8B7355',    # Brown
            'accent': '#D4AF37',       # Gold
            'text': '#FFFFFF',
            'dark': '#000000'
        },
        'fonts': {
            'primary': 'Montserrat',
            'secondary': 'Poppins'
        },
        'tagline': 'Comfort & Luxury',
        'pattern': 'gradient'
    },
    'Spa': {
        'icon': '🧖',
        'colors': {
            'primary': '#663399',      # Purple
            'secondary': '#DDA0DD',    # Plum
            'accent': '#98FB98',       # Pale green
            'text': '#FFFFFF',
            'dark': '#3D1A5C'
        },
        'fonts': {
            'primary': 'Poppins',
            'secondary': 'Poppins'
        },
        'tagline': 'Relax & Rejuvenate',
        'pattern': 'gradient'
    }
}

# Design Templates
TEMPLATES = {
    'bold_street': {
        'name': 'Bold Street Sign',
        'description': 'Eye-catching street sign design',
        'style': 'bold',
        'layout': 'vertical',
        'border': True
    },
    'premium_glow': {
        'name': 'Premium Glow Board',
        'description': 'Elegant gradient with premium feel',
        'style': 'premium',
        'layout': 'centered',
        'border': False,
        'shadow': True
    },
    'minimal_pro': {
        'name': 'Minimal Professional',
        'description': 'Clean and professional design',
        'style': 'minimal',
        'layout': 'modern',
        'border': False,
        'shadow': False
    }
}


# Business types list
BUSINESS_TYPES = list(BUSINESS_DESIGNS.keys())



@app.route('/')
def index():
    """Render the main application page"""
    return render_template('index.html')


@app.route('/api/templates', methods=['GET'])
def get_templates():
    """API endpoint to get all available design templates"""
    return jsonify({
        'status': 'success',
        'templates': TEMPLATES
    })


@app.route('/api/business-types', methods=['GET'])
def get_business_types():
    """API endpoint to get available business types"""
    return jsonify({
        'status': 'success',
        'types': BUSINESS_TYPES
    })


@app.route('/api/generate-design', methods=['POST'])
def generate_design():
    """
    API endpoint to generate professional signboard design
    Accepts: shop_name, business_type, template_id
    Returns: Complete design configuration ready for Canvas rendering
    """
    try:
        data = request.get_json()
        shop_name = data.get('shop_name', 'Your Shop').strip()
        business_type = data.get('business_type', 'Restaurant')
        template_id = data.get('template_id', 'bold_street')

        # Get business design configuration
        if business_type not in BUSINESS_DESIGNS:
            business_type = 'Restaurant'
        
        business_config = BUSINESS_DESIGNS[business_type]
        template_config = TEMPLATES.get(template_id, TEMPLATES['bold_street'])

        # Generate design elements
        design = {
            'status': 'success',
            'shop_name': shop_name,
            'business_type': business_type,
            'template_id': template_id,
            'template_name': template_config['name'],
            'colors': business_config['colors'],
            'fonts': business_config['fonts'],
            'icon': business_config['icon'],
            'tagline': business_config['tagline'],
            'layout': template_config['layout'],
            'style': template_config['style'],
            'canvasWidth': 800,
            'canvasHeight': 600,
            'elements': {
                'background': {
                    'type': 'gradient',
                    'color1': business_config['colors']['primary'],
                    'color2': business_config['colors']['dark'],
                    'angle': 135,
                    'pattern': business_config['pattern']
                },
                'border': {
                    'enabled': template_config['border'],
                    'color': business_config['colors']['accent'],
                    'width': 8
                },
                'icon': {
                    'text': business_config['icon'],
                    'x': 400,
                    'y': 100,
                    'size': 80,
                    'color': business_config['colors']['accent']
                },
                'shopName': {
                    'text': shop_name.upper(),
                    'x': 400,
                    'y': 200,
                    'fontSize': 72,
                    'fontFamily': business_config['fonts']['primary'],
                    'fontWeight': '900',
                    'color': business_config['colors']['text'],
                    'align': 'center',
                    'textShadow': True,
                    'shadowColor': 'rgba(0,0,0,0.5)',
                    'shadowBlur': 10,
                    'maxWidth': 700
                },
                'tagline': {
                    'text': business_config['tagline'],
                    'x': 400,
                    'y': 300,
                    'fontSize': 28,
                    'fontFamily': business_config['fonts']['secondary'],
                    'fontWeight': '500',
                    'color': business_config['colors']['secondary'],
                    'align': 'center',
                    'textShadow': True,
                    'shadowColor': 'rgba(0,0,0,0.3)',
                    'shadowBlur': 5,
                    'maxWidth': 700
                },
                'businessType': {
                    'text': business_type,
                    'x': 400,
                    'y': 380,
                    'fontSize': 20,
                    'fontFamily': business_config['fonts']['secondary'],
                    'fontWeight': '400',
                    'color': business_config['colors']['accent'],
                    'align': 'center',
                    'textShadow': False,
                    'maxWidth': 700,
                    'letterSpacing': 2
                },
                'decorLine1': {
                    'type': 'line',
                    'x1': 100,
                    'y1': 420,
                    'x2': 700,
                    'y2': 420,
                    'color': business_config['colors']['accent'],
                    'width': 3
                },
                'decorLine2': {
                    'type': 'line',
                    'x1': 100,
                    'y1': 460,
                    'x2': 700,
                    'y2': 460,
                    'color': business_config['colors']['secondary'],
                    'width': 2
                }
            }
        }

        return jsonify(design)

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


@app.route('/api/save-design', methods=['POST'])
def save_design():
    """
    API endpoint to save design (for future database storage)
    """
    try:
        data = request.get_json()
        design_data = data.get('design', {})

        # In a production app, you would save this to a database
        # For now, we just acknowledge receipt
        response = {
            'status': 'success',
            'message': 'Design configuration saved',
            'timestamp': datetime.now().isoformat(),
            'design_id': 'design_' + datetime.now().strftime('%Y%m%d_%H%M%S')
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


@app.route('/api/export', methods=['POST'])
def export_design():
    """
    API endpoint for design export
    The actual PNG export is handled client-side with html2canvas
    """
    try:
        data = request.get_json()
        # We could add server-side validation or processing here
        return jsonify({
            'status': 'success',
            'message': 'Design exported successfully'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'status': 'error', 'message': 'Not found'}), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return jsonify({'status': 'error', 'message': 'Server error'}), 500


if __name__ == '__main__':
    # Run with debug mode enabled for development
    app.run(debug=True, host='0.0.0.0', port=5000)
