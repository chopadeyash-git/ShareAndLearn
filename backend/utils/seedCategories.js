const Category = require('../models/category');

const categories = [
    { name: 'Web Development', description: 'Learn to build modern websites and web applications' },
    { name: 'Mobile Development', description: 'Create mobile apps for iOS and Android' },
    { name: 'Data Science', description: 'Master data analysis, machine learning, and AI' },
    { name: 'Cloud Computing', description: 'Learn AWS, Azure, and cloud technologies' },
    { name: 'DevOps', description: 'Master CI/CD, Docker, Kubernetes, and automation' },
    { name: 'Cybersecurity', description: 'Learn ethical hacking and security practices' },
    { name: 'Blockchain', description: 'Understand blockchain and cryptocurrency development' },
    { name: 'UI/UX Design', description: 'Design beautiful and user-friendly interfaces' },
    { name: 'Digital Marketing', description: 'Master SEO, social media, and online marketing' },
    { name: 'Business & Management', description: 'Learn business strategy and management skills' }
];

const seedCategories = async () => {
    try {
        const existingCategories = await Category.find({});
        
        if (existingCategories.length === 0) {
            await Category.insertMany(categories);
            console.log('✅ Categories seeded successfully');
        } else {
            console.log('✅ Categories already exist');
        }
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
    }
};

module.exports = seedCategories;
