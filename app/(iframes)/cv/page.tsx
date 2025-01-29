import classNames from 'classnames';
import './index.css';

import { Merriweather } from 'next/font/google';

// Font from vas3k website
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'], // Add the weights you need
    style: ['normal', 'italic'], // Add styles if needed
    display: 'swap', // Improves loading performance
});

export default async function Page (): Promise<JSX.Element> {
    return <div className={classNames('container', merriweather.className)}>
        <aside className="sidebar">
            <div className="profile-pic">
                <img src="profile.jpg" alt="Profile Picture"/>
            </div>
            <h2>John Doe</h2>
            <p className="title">Web Developer</p>
            <hr/>
            <div className="contact-info">
                <p><strong>Email:</strong> johndoe@email.com</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
                <p><strong>Location:</strong> New York, USA</p>
                <p><strong>Website:</strong> www.johndoe.com</p>
            </div>
        </aside>

        <main className="content">
            <section>
                <h2>About Me</h2>
                <p>I am a passionate web developer with 5+ years of experience in building modern, responsive websites and applications.</p>
            </section>

            <section>
                <h2>Experience</h2>
                <div className="job">
                    <h3>Senior Web Developer</h3>
                    <p><strong>XYZ Company</strong> | 2020 - Present</p>
                    <p>Developed and maintained e-commerce platforms, increasing sales by 30% through optimized UI/UX.</p>
                </div>
                <div className="job">
                    <h3>Frontend Developer</h3>
                    <p><strong>ABC Inc.</strong> | 2017 - 2020</p>
                    <p>Implemented responsive web designs and interactive UI elements.</p>
                </div>
            </section>

            <section>
                <h2>Education</h2>
                <p><strong>Bachelor’s in Computer Science</strong> - XYZ University (2013 - 2017)</p>
            </section>

            <section>
                <h2>Skills</h2>
                <ul className="skills">
                    <li>HTML / CSS</li>
                    <li>JavaScript / React</li>
                    <li>Node.js / Express</li>
                    <li>UI/UX Design</li>
                    <li>SEO Optimization</li>
                </ul>
            </section>
        </main>
    </div>;

    // const readmeFilePath = resolve(getNextJsRootDirectory(), './README.md');

    // const { markdownContent } = await getNoteByFilePath({ filePath: readmeFilePath });

    // const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    // return <div className={styles.Home__markdownContent_xxx}>
    //     {markdownComponent}
    // </div>;
}
