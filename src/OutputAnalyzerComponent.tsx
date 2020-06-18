import React from 'react';

interface OutputAnalyzerComponentState {
  sdkOutput: string;
}

interface OutputAnalyzerComponentProps {}

interface TimeSlice {
  id: string;
  timestamp: string;
  content: string;
}

/*
Use the following json:
[
  { "id": "id1", "timestamp": "2020-06-18T16:48:00Z", "content":"Starting up"},
  { "id": "id2", "timestamp": "2020-06-18T16:50:00Z", "content":"Running"},
  { "id": "id3", "timestamp": "2020-06-18T16:52:00Z", "content":"Died"}
]
*/

/**
 * Example of React component:
 * <textarea /> is where the user copy/pastes the SDK output
 * The component keeps this user input in a state variable called "sdkOutput".
 * render() gets called by the React framework when the state changes (among other things)
 */
export class OutputAnalyzerComponent extends React.Component<OutputAnalyzerComponentProps, OutputAnalyzerComponentState> {
  constructor(props: OutputAnalyzerComponentProps) {
    super(props);

    // Initial condition
    this.state = {
      sdkOutput: ''
    }
  }

  private analyzeOutput(): TimeSlice[] {
    if (!this.state.sdkOutput) {
      return [];
    }
    const outputObjet = JSON.parse(this.state.sdkOutput);
    return outputObjet;
  }

  private renderTimeline(): JSX.Element {
    const timeline = this.analyzeOutput();
    return <>
    <ul>
      {timeline.map(s => <li>id:{s.id} timestamp:{s.timestamp} content:{s.content}</li>)}
    </ul>
    <div>{`You have ${timeline.length} events`}</div>
    </>;
  }

  render(): JSX.Element {
    return <div>
      <h2>Enter SDK output here:</h2>
      <div><textarea value={this.state.sdkOutput} onChange={e => this.setState({ sdkOutput: e.target.value })} /></div>
      <hr />
      <h2>Here's a timeline:</h2>
      <div>{this.renderTimeline()}</div>
    </div>;
  }
}