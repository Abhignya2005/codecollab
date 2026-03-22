import java.util.*;
class Main{
    static void DFS(Map<Integer,List<Integer>> graph , int node)
    {
        Stack<Integer> st = new Stack<>();
        boolean vis[] = new boolean[graph.size()];
        List<Integer> l = new ArrayList<>();
        st.push(node);
        vis[node]=true;
        while(!st.isEmpty()){
            int key = st.pop();
            l.add(key);
            for(int h:graph.get(key))
            {
                if(vis[h]==false)
                {
                    vis[h]=true;
                    st.push(h);
                }
            }
        }
        System.out.println(l);
    }
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        int p=sc.nextInt();
        int q=sc.nextInt();
        Map<Integer,List<Integer>> graph = new HashMap<>();
        for(int i=0;i<q;i++)
        {
            int a=sc.nextInt();
            int b=sc.nextInt();
            graph.computeIfAbsent(a,x->new ArrayList<>()).add(b);
            graph.computeIfAbsent(b,x->new ArrayList<>()).add(a);
        }
        int start = sc.nextInt();
        DFS(graph,start);
    }
}